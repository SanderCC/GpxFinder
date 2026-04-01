using BL.Gpx.Models;

namespace BL.Gpx;

public interface IGpxParser
{
    GpxParseResult Parse(Stream gpxStream);
    GpxParseResult Parse(string gpxFilePath);
}
