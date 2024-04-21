using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDbApi.Models;
using MongoDbApi.Repositories;

namespace MongoDbApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CuentaController : Controller
    {
        private ICuentaCollection db=new CuentaCollection();

        [HttpGet]
        public async Task<IActionResult> GetAllCuentas()
        {
            return Ok(await db.GetAllCuenta());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCuenta(string id)
        {
            return Ok(await db.GetCuentaById(id));
        }

        [HttpPost("ahorros")]
        public async Task<ActionResult<Cuenta>> CrearCuentaAhorros(CuentaAhorros cuenta)
        {
            await db.InsertCuenta(cuenta);
            return Ok(cuenta);
        }

        [HttpPost("corriente")]
        public async Task<ActionResult<Cuenta>> CrearCuentaCorriente(CuentaCorriente cuenta)
        {
            await db.InsertCuenta(cuenta);
            return Ok(cuenta);
        }

        [HttpPost("consignar/{id}")]
        public async Task<IActionResult> Consignar(string id, [FromBody] decimal valor)
        {
            var cuenta = await db.GetCuentaById(id);

            if (cuenta == null)
            {
                return NotFound();
            }

            cuenta.Consignar(valor);
            await db.UpdateCuenta( cuenta);

            return NoContent();
        }
        [HttpPost("retirar/{id}")]
        public async Task<IActionResult> Retirar(string id, [FromBody] decimal valor)
        {
            var cuenta = await db.GetCuentaById(id);

            if (cuenta == null)
            {
                return NotFound();
            }
            if (cuenta.Saldo - valor >= 0)
            {
                cuenta.Consignar(valor);
                await db.UpdateCuenta(cuenta);

                return NoContent();
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCuenta([FromBody] Cuenta cuenta,string id)
        {
            if (cuenta == null)
            {
                return BadRequest();
            }
            cuenta.Id=new MongoDB.Bson.ObjectId(id);
            await db.UpdateCuenta(cuenta);
            return Created("Created", true);
        }
        [HttpDelete] 
        public async Task<IActionResult> DeleteCuenta(string id)
        {
            await db.DeleteCuenta(id);
            return NoContent();
        }
    }
}