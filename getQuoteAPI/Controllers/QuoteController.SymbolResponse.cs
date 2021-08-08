using System.Collections.Generic;

namespace getQuoteAPI
{
    public class SymbolResponse
    {
        public bool Success { get; set; }
        public Dictionary<string, string> Symbols { get; set; }
    }

    public class Currency
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
    }
}
