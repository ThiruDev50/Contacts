using App.Contacts.WebHost.Models.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace App.Contacts.WebHost.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }

}
