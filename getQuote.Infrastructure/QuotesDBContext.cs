using getQuote.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace getQuote.Infrastructure
{
    public class QuotesDBContext : DbContext
    {
        public DbSet<Quote> Quotes { get; set; }

        public QuotesDBContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
