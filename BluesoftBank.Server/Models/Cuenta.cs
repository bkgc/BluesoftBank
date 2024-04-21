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

        public string NumeroCuenta { get; set; }
        public decimal Saldo { get; protected set; }
        public DateTime FechaCreacion { get; set; }
        public string PropietarioName { get; set; } // Referencia al propietario de la cuenta
        public abstract void Consignar(decimal valor);
        public abstract void Retirar(decimal valor);
        public Cuenta()
        {
            NumeroCuenta = Guid.NewGuid().ToString();
            FechaCreacion = DateTime.UtcNow;
        }
    }

    public class CuentaAhorros : Cuenta
    {
        public decimal TasaInteres { get; private set; }

        public override void Consignar(decimal valor)
        {
            if (valor <= 0)
            {
                throw new ArgumentException("El valor a consignar debe ser mayor que cero.");
            }

            Saldo += valor;
        }

        public override void Retirar(decimal valor)
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
        }
    }

    public class CuentaCorriente : Cuenta
    {
        public decimal Sobregiro { get; private set; }

        public override void Consignar(decimal valor)
        {
            if (valor <= 0)
            {
                throw new ArgumentException("El valor a consignar debe ser mayor que cero.");
            }

            Saldo += valor;
        }

        public override void Retirar(decimal valor)
        {
            if (valor <= 0)
            {
                throw new ArgumentException("El valor a retirar debe ser mayor que cero.");
            }

            if (valor > Saldo + Sobregiro)
            {
                throw new InvalidOperationException("Fondos insuficientes para realizar el retiro.");
            }

            Saldo -= valor;
        }
    }
}