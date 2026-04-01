namespace Domain.App.Enums;

[Flags]
public enum SurfaceType
{
    Paved = 1,
    Gravel = 2,
    Dirt = 4,
    Sand = 8,
    Rock = 16,
    Grass = 32,
    Mixed = 64,
}
