using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using getQuote.Infrastructure;
using getQuote.Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace getQuoteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuoteController : ControllerBase
    {
        private readonly ILogger<QuoteController> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly QuotesDBContext _quotesDbContext;

        public QuoteController(ILogger<QuoteController> logger, IHttpClientFactory httpClientFactory, QuotesDBContext quotesDbContext)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _quotesDbContext = quotesDbContext;
        }

        [HttpGet("/currencies")]
        public async Task<List<Currency>> Get()
        {
            var httpClient = _httpClientFactory.CreateClient();
            httpClient.BaseAddress = new Uri("http://api.exchangeratesapi.io/v1/symbols?access_key=193572a8c01ee6b76ee128e90292d231");
            var request = new HttpRequestMessage(HttpMethod.Get, string.Empty);
            var response = await httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var symbolsResponse = JsonConvert.DeserializeObject<SymbolResponse>(result);
                return symbolsResponse.Symbols.Select(x => new Currency { Symbol = x.Key, Name = x.Value }).ToList();
            }
            else
            {
                return new List<Currency>() { new Currency { Symbol = "AUD", Name = "Australian Dollar" } };
            }            
        }

        [HttpGet("/quote")]
        public async Task<Quote> Quote()
        {
            var quote = await _quotesDbContext.Quotes.OrderByDescending(x => x.Date).FirstAsync();
            return quote;
        }

        [HttpPost("/quote/create")]
        public async Task<Quote> CreateQuote([FromForm] GetQuoteRequest request)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var url = "https://free.currconv.com/api/v7/convert";
            url += $"?q={request.FromCurrency}";
            url += $"_{request.ToCurrency}";
            url += $"&compact=ultra";
            url += $"&apiKey=5639858463c0aa8ae4ac";
            httpClient.BaseAddress = new Uri(url);
            var getQuoteRequest = new HttpRequestMessage(HttpMethod.Get, string.Empty);
            var response = await httpClient.SendAsync(getQuoteRequest);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var getQuoteResponse = JsonConvert.DeserializeObject<Dictionary<string, double>>(result);
                var quote = new Quote();
                quote.FirstName = request.FirstName;
                quote.LastName = request.LastName;
                quote.Email = request.Email;
                quote.Phone = request.Phone;
                quote.FromCurrency = request.FromCurrency;
                quote.ToCurrency = request.ToCurrency;
                quote.Rate = getQuoteResponse.Values.First();
                quote.Amount = request.Amount;
                quote.ConvertedAmount = request.Amount * quote.Rate;
                quote.Date = DateTime.Now;

                await _quotesDbContext.Set<Quote>().AddAsync(quote);
                await _quotesDbContext.SaveChangesAsync();
                return quote;
            }
            else
            {
                return null;
            }
        }
    }
}
