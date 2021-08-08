using getQuote.Infrastructure.Entities;
using System;

namespace getQuote.Infrastructure.Seeds
{
    public static class DataSeeder
    {
        public static void SeedData(this QuotesDBContext dBContext)
        {
            var quote = new Quote();
            quote.FirstName = "TJ";
            quote.LastName = "TJ";
            quote.Email = "tapjyotmakkar@gmail.com";
            quote.Phone = "0450975098";
            quote.FromCurrency = "AUD";
            quote.ToCurrency = "USD";
            quote.Rate = 0.734;
            quote.Amount = 10;
            quote.ConvertedAmount = 7.340;
            quote.Date = DateTime.Now;

            dBContext.Quotes.Add(quote);
            dBContext.SaveChanges();
        }
    }
}
