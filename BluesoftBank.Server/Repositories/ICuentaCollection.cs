using MongoDB.Driver;
using MongoDbApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDbApi.Repositories
{
    public interface ICuentaCollection
    {
        Task InsertCuenta(Cuenta cuenta);
        Task UpdateCuenta(Cuenta cuenta);
        Task DeleteCuenta(string id);
        Task<List<Cuenta>> GetAllCuenta();
        Task<Cuenta> GetCuentaById(string id);
    }
}