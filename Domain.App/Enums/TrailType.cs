namespace Domain.App.Enums;

[Flags]
public enum TrailType
{
    Cycling = 1,
    Hiking = 2,
    Running = 4,
    MountainBiking = 8,
    Gravel = 16,
    Walking = 32,
}
