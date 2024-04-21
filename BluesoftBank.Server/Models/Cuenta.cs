using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDbApi.Models
{
    public abstract class Cuenta
    {
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public string tipo { get; set; }
        public string NumeroCuenta { get; set; }
        public decimal Saldo { get; protected set; }
        public DateTime FechaCreacion { get; set; }
        public List<Movimiento> movimientos { get; set; }

        public string city { get; set; }
        public string name { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public decimal TasaInteres { get; private set; }
        public decimal Sobregiro { get; private set; }

        public Cuenta()
        {
            NumeroCuenta = Guid.NewGuid().ToString();
            FechaCreacion = DateTime.UtcNow;
            movimientos = new List<Movimiento>();
            tipo = "";
        }
        public virtual void Consignar(decimal valor)
        {
            if (valor <= 0)
            {
                throw new ArgumentException("El valor a consignar debe ser mayor que cero.");
            }

            Saldo += valor;
            movimientos.Add(new Movimiento(valor, DateTime.UtcNow, TipoMovimiento.Consignacion));
        }

        public virtual void Retirar(decimal valor)
        {
            if (valor <= 0)
            {
                throw new ArgumentException("El valor a retirar debe ser mayor que cero.");
            }

            if (valor > Saldo)
            {
                throw new InvalidOperationException("Fondos insuficientes para realizar el retiro.");
            }

            Saldo -= valor;
            movimientos.Add(new Movimiento(valor, DateTime.UtcNow, TipoMovimiento.Retiro));
        }
        public abstract List<Movimiento> ObtenerUltimosMovimientos(int cantidad);
        public abstract List<Movimiento> GenerarExtractoMensual(int year, int month);

    }
    public class CuentaAhorros : Cuenta
    {
        public override List<Movimiento> ObtenerUltimosMovimientos(int cantidad)
        {
            var movimientosOrdenados = movimientos.OrderByDescending(m => m.Fecha);
            var ultimosMovimientos = movimientosOrdenados.Take(cantidad).ToList();

            return ultimosMovimientos;
        }
        public override List<Movimiento> GenerarExtractoMensual(int year, int month)
        {
            var movimientosDelMes = movimientos.Where(m => m.Fecha.Year == year && m.Fecha.Month == month).ToList();
            return movimientosDelMes;
        }
    }
    public class CuentaCorriente : Cuenta
    {
        //
        public override List<Movimiento> GenerarExtractoMensual(int year, int month)
        {
            throw new NotImplementedException();
        }

        public override List<Movimiento> ObtenerUltimosMovimientos(int cantidad)
        {
            throw new NotImplementedException();
        }
    }
    public class Movimiento
    {
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public TipoMovimiento Tipo { get; set; }

        public Movimiento(decimal monto, DateTime fecha, TipoMovimiento tipo)
        {
            Monto = monto;
            Fecha = fecha;
            Tipo = tipo;
        }
    }

    public enum TipoMovimiento
    {
        Consignacion,
        Retiro
    }

}