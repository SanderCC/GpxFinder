namespace BL.Core.Attributes;

[AttributeUsage(AttributeTargets.Class)]
public class ScopedAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Class)]
public class ServiceAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Class)]
public class HandlerAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Class)]
public class HelperAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Class)]
public class CredentialsAttribute : Attribute { }
