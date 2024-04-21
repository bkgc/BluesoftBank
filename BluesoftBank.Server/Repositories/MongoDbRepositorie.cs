using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDbApi.Repositories
{
    public class MongoDbRepositorie
    {
        public MongoClient Client;
        public IMongoDatabase db;
        public MongoDbRepositorie()
        {
            Client = new MongoClient("mongodb+srv://admin:admin@prueba.snybnzm.mongodb.net/?retryWrites=true&w=majority&appName=prueba");
            db = Client.GetDatabase("Bluesoft");
        }
    }
}
