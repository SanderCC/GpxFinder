namespace BL.Core.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class ScopedAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Class)]
public class ServiceAttribute : ScopedAttribute { }

[AttributeUsage(AttributeTargets.Class)]
public class HandlerAttribute : ScopedAttribute { }

[AttributeUsage(AttributeTargets.Class)]
public class HelperAttribute : ScopedAttribute { }

[AttributeUsage(AttributeTargets.Class)]
public class CrawlerAttribute : ScopedAttribute { }
