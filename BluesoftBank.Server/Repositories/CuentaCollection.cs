using MongoDB.Bson;
using MongoDB.Driver;
using MongoDbApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDbApi.Repositories
{
    public class CuentaCollection : ICuentaCollection
    {

        internal MongoDbRepositorie _repositorie=new MongoDbRepositorie();
        private IMongoCollection<Cuenta> _cuentas;

        public CuentaCollection()
        {
            _cuentas = _repositorie.db.GetCollection<Cuenta>("Cuentas");
        }
        public async Task DeleteCuenta(string id)
        {
            var filter = Builders<Cuenta>.Filter.Eq(s=>s.Id,new ObjectId(id));
            await _cuentas.DeleteOneAsync(filter);
        }

        public async Task<List<Cuenta>> GetAllCuenta()
        {
            //return await _cuentas.FindAsync(new BsonDocument()).Result.ToListAsync();
            var cuentasAhorros = await _cuentas.FindAsync<CuentaAhorros>(new BsonDocument()).Result.ToListAsync();
            var cuentasCorriente = await _cuentas.FindAsync<CuentaCorriente>(new BsonDocument()).Result.ToListAsync();

            var todasLasCuentas = new List<Cuenta>();
            foreach (CuentaAhorros cuenta in cuentasAhorros) 
            {
                if (cuenta.tipo == "ahorro")
                {
                    todasLasCuentas.Add(cuenta);
                }
            }
            foreach (CuentaCorriente cuenta in cuentasCorriente)
            {
                if (cuenta.tipo == "corriente")
                {
                    todasLasCuentas.Add(cuenta);
                }
            }

            return todasLasCuentas;
        }

        public async Task<Cuenta> GetCuentaById(string id)
        {
            return await _cuentas.FindAsync(
                new BsonDocument { { "_id",new ObjectId(id)} }).Result.FirstAsync();
        }

        public async Task InsertCuenta(Cuenta cuenta)
        {
            await _cuentas.InsertOneAsync(cuenta);
        }

        public async Task UpdateCuenta(Cuenta cuenta)
        {
            var filter = Builders<Cuenta>
                .Filter
                .Eq(s => s.Id, cuenta.Id);
            await _cuentas.ReplaceOneAsync(filter, cuenta);
        }
    }
}