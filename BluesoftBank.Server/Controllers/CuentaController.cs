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
            cuenta.tipo = "ahorro";
            await db.InsertCuenta(cuenta);
            return Ok(cuenta);
        }

        [HttpPost("corriente")]
        public async Task<ActionResult<Cuenta>> CrearCuentaCorriente(CuentaCorriente cuenta)
        {
            cuenta.tipo = "corriente";
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
            await db.UpdateCuentaMoney( cuenta);

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
            cuenta.Retirar(valor);
            await db.UpdateCuentaMoney(cuenta);

            return NoContent();
        }

        [HttpGet("lastMovements/{id}")]
        public async Task<IActionResult> ObtenerUltimosMovimientos(string id, int cantidad)
        {
            var cuenta = await db.GetCuentaById(id);

            if (cuenta == null)
            {
                return NotFound();
            }

            if (cuenta.tipo=="ahorro")
            {
                var ultimosMovimientos =cuenta.ObtenerUltimosMovimientos(cantidad);
                return Ok(ultimosMovimientos);
            }
            else
            {
                return BadRequest("La cuenta especificada no es una cuenta de ahorros.");
            }
        }

        [HttpGet("extracto/{id}")]
        public async Task<IActionResult> GenerarExtractoMensual(string id, int year, int month)
        {
            var cuenta = await db.GetCuentaById(id);

            if (cuenta == null)
            {
                return NotFound();
            }

            if (cuenta.tipo=="ahorro")
            {
                var extractoMensual = cuenta.GenerarExtractoMensual(year, month);
                return Ok(extractoMensual);
            }
            else
            {
                return BadRequest("La cuenta especificada no es una cuenta de ahorros.");
            }
        }

        [HttpGet("listadotransacciones/{year}/{month}")]
        public async Task<IActionResult> ListarClientesTransacciones(int year, int month)
        {
            var clientesTransacciones = new List<Tuple<Cuenta, int>>();

            // Obtener todas las cuentas
            var cuentas = await db.GetAllCuenta();

            foreach (var cuenta in cuentas)
            {
                var movimientosMes = cuenta.movimientos.Where(m => m.Fecha.Year == year && m.Fecha.Month == month).ToList();

                int numeroTransacciones = movimientosMes.Count;
                clientesTransacciones.Add(new Tuple<Cuenta, int>(cuenta, numeroTransacciones));
            }

            // Ordenar la lista de clientes por el número de transacciones en orden descendente
            clientesTransacciones = clientesTransacciones.OrderByDescending(tuple => tuple.Item2).ToList();

            // Extraer solo las cuentas ordenadas
            var cuentasOrdenadas = clientesTransacciones.Select(tuple => tuple.Item1).ToList();

            return Ok(cuentasOrdenadas);
        }
        [HttpGet("retirosfuera/{ciudadOrigen}")]
        public async Task<IActionResult> ListarClientesRetirosFuera(string ciudadOrigen)
        {
            var clientesRetirosFuera = new List<Cuenta>();
            var cuentas =await db.GetAllCuenta();

            foreach (var cuenta in cuentas)
            {
                var retirosFuera = cuenta.movimientos.Where(m => m.Tipo == TipoMovimiento.Retiro && cuenta.city != ciudadOrigen).ToList();
                decimal totalRetiros = retirosFuera.Sum(m => m.Monto);
                if (totalRetiros >= 1000000)
                {
                    clientesRetirosFuera.Add(cuenta);
                }
            }

            return Ok(clientesRetirosFuera);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCuenta([FromBody] UpdateCuentaModel cuenta,string id)
        {
            if (cuenta == null)
            {
                return BadRequest();
            }
            await db.UpdateCuenta(cuenta,id);
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