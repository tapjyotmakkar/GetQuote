using System;

namespace getQuote.Infrastructure.Entities
{
    public class Quote
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FromCurrency { get; set; }
        public string ToCurrency { get; set; }
        public double Amount { get; set; }
        public double? Rate { get; set; }
        public double? ConvertedAmount { get; set; }
        public DateTime Date { get; set; }
    }
}
