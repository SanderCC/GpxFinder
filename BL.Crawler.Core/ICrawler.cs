using Domain.App;

namespace BL.Crawler.Core;

public interface ICrawler
{
    string Source { get; }
    Task RunAsync(CancellationToken ct = default);
}

public interface ITrailCrawler : ICrawler
{
    IAsyncEnumerable<Trail> CrawlTrailsAsync(CancellationToken ct = default);
}
