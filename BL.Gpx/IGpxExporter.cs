using Domain.App;

namespace BL.Gpx;

public interface IGpxExporter
{
    void Export(Trail trail, Stream outputStream);
    byte[] Export(Trail trail);
}
