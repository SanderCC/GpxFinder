using Domain.App;

namespace BL.Gpx;

public interface IGpxTrailService
{
    Trail CreateTrailFromGpx(Stream gpxStream, string gpxFileUrl, Guid? createdByUserId = null);
    Trail CreateTrailFromGpx(string gpxFilePath, string gpxFileUrl, Guid? createdByUserId = null);
}
