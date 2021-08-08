using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace getQuote.Infrastructure.Entities
{
    public class QuoteConfigurtion : IEntityTypeConfiguration<Quote>
    {
        public void Configure(EntityTypeBuilder<Quote> builder)
        {
            builder.ToTable("Quote");
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).IsRequired();
        }
    }
}
