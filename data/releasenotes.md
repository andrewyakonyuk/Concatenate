# Release notes

## 1.4.0

### 1. Extend the replacement tag functionality.
You can use any test config setting as a replacement in the report portal configuration.
Before, you had limit with the following numbers of replacements:
- `projectName` - usually it is the domain name of the webstore which is taken from `websiteUrl` setting. But it is possible to specify you own value with the setting with exact the same name `projectName`, e.g.:
- `machineName` - name of the machine which executing the tests.

For now, you can use the replacement above + any setting from configuration file, like `websiteUrl`, `defaultBrowser` or `updateSettings`.

### 2. Improve logging for complex actions
To improve the log readability, a new `Indent` method has been introduced in the `Logger` class. 
This method allows you to add indent for the all next log messages in `using` scope. 
Example of usage: 
```csharp
    Logger.Instance.WriteInformation("Authenticate " + customer.CustomerType);
    using (Logger.Instance.Indent())
    {
        if (customer.GetType() == typeof(Anonymous))
        {
            I.LogoutIfNeeded();
            I.RemoveCurrentBasket();
            I.SetRequiredSettings(Settings.ShopType.PublicStore);
        }

        else
        {
            I.Login(customer.EmailAddress, customer.Password);
            I.RemoveCurrentBasket();
        }
    }
    I.Open(HomePage);
```

It will produce the following output:
```
Authenticate B2BCustomer
—— I open Login page
—— I fill Login page > Email (#UserName) with "autotest_b2c@sana-commerce.com" text
—— I fill Login page > Password (#Password) with "ABCabc123!" text
—— I click on Login page > Login button (.profile-login-page .content .btn-login)
—— I wait until ready 1 second with 1 second delay
```

You can nest `Indent` calls to each other, for example:
```csharp
    Logger.Instance.WriteInformation("Text without indent.");
    using (Logger.Instance.Indent())
    {
        Logger.Instance.WriteInformation("Text with first level of indent.");
        using(Logger.Instance.Indent()) 
        {
            Logger.Instance.WriteInformation("Text with second level of indent.").
        }
    }
    Logger.Instance.WriteInformation("Again text without indent.");
```

In result you get: 
```
Text without indent.
—— Text with first level of indent.
———— Text with second level of indent.
Again text without indent.
```

### 3. Allows to tell which browser errors should fail test
Now you can specifiy a list of browser errors that will fail the test.
You can skip this check by setting the value to "false" either setting an empty list.
Setting the value in "true" will tell the framework to use the recommended browser error types. 
E.g.:
```json
"checkBrowserLogs": [ 
    "SyntaxError", 
    "EvalError", 
    "ReferenceError", 
    "RangeError", 
    "TypeError", 
    "URIError", 
    "Refused to display",
    "Internal Server Error", 
    "Cannot read property" 
]
```
In this example, if the browser log contains `SyntaxError: expected expression, got '?'`, the test will fail.

### 4. Add possibility to apply several(optional) required settings values suitable for test.
Currently, there is a problem with running the test in the "do-not-update-settings" mode.
The website already have the settings that are intended for one or multiple user types, or they have several options which can be allowed to work with test.
However you cannot specify a few setting values in the single test, the more you can not indicate that a certain set of setting values can be applied with user types but not other.
Thus that tests are skipped when UpdateSettings=true.
To fill this gap the following steps were taken:
1. For now you can indicate relations between the test data(e.g. Customer) and the website setting with a new `IConditionalSettingData` interface.
   The `IConditionalSettingData` interface have only single `CanApply` method, which take the required setting as input and check whether test data can be applied together with the setting info in the same test. 
   In the example below, the `B2BCustomer` class is test data, which can be passed as an argument in you test method and this class implement `IConditionalSettingData` interface.
   In the same time, `EnableUnitOfMeasure` is a name of setting that can take values: All, B2BCustomer, SalesAgent, SalesAgentAndB2BCustomer and None.
   So, the test method for B2B customer runs in all cases except when EnableUnitOfMeasure equals to None or SalesAgent values. If EnableUnitOfMeasure = None | SalesAgent, then test will be ignored.
```csharp
    public class B2BCustomer : IConditionalSettingData
    {
        public bool CanApply(SettingInfo settingInfo)
        {
            if (settingInfo.Name.iEquals("EnableUnitOfMeasure"))
            {
                return settingInfo.Value.iEquals("All")
                    || settingInfo.Value.iEquals("B2BCustomer")
                    || settingInfo.Value.iEquals("SalesAgentAndB2BCustomer");
            }

            return true;
        }
    }
```
2. Also, you can now specify a several setting values in single `Required Setting Attribute`:
```csharp
    [Test, SanaTestCaseSource(typeof(TestDataSets), "Anonymous, B2C, B2B, Contact, SalesAgent")]
    [RequiredSetting(
        Settings.UnitOfMeasureVisibility.SalesAgentAndB2BCustomer, 
        Settings.UnitOfMeasureVisibility.B2BCustomer,
        Settings.UnitOfMeasureVisibility.SalesAgent)]
    public void ProductDetails_B2BMatrixLayout_Visible_UOM(Customer customer)
```
When the `updateSettings` is set to `true` in config file, then only the first value (in our case `Settings.UnitOfMeasureVisibility.SalesAgentAndB2BCustomer`) is used to update the website. 
Other settings will be skipped and will not be used.
Otherwise, the framework checks either any of the provided settings are matched with website configuration. If so, then the test will run, if not skipped.
Keep in mind, that the list of setting to check are based on relations between test data and setting, thus not all the setting will be check to all types of users.
For example, the tests for Anonymous and B2C Customer will be skipped because there are no settings in test method above that correspond with these types of users.

### 5. Test is skipped if test data is not properly filled in
For now, the test will be skipped automatically if it is used the test data with not filled in fields.
Any field considered to empty when it set to '-'. 

Test data:
```yaml
B2C:
    UserName: B2C customer
    EmailAddress: -
    Password: ABCabc123!
    AccountType: Customer
    CustomerId: CUST-B2C
```
Test method:
```csharp
    [Test]
    public void LoginAsB2C() 
    {
        I.Login(TestData.ShopAccount.B2C.EmailAddress, TestData.ShopAccount.B2C.Password);
    }
```
In this example the `LoginAsB2C` test method will be skipped because the `EmailAddress` field is marked with '-' symbol.
All the fields are required.
If you want to check if test data is ready to use then invoke 'IsEmpty' method:

```csharp
    public static IEnumerable B2C
    {
        get
        {
            if (TestData.ShopAccount.B2C.IsEmpty(out var message))
            {
                yield return new TestCaseData(new B2CCustomer())
                    .Ignore(message);
                yield break;
            }

            yield return new TestCaseData(
                new B2CCustomer
                {
                    UserName = TestData.ShopAccount.B2C.UserName,
                    EmailAddress = TestData.ShopAccount.B2C.EmailAddress,
                    Password = TestData.ShopAccount.B2C.Password
                }).SetCategory(Categories.B2C_Customer);
        }
    }
```
In this case the test will to skip right away.

### Other changes:
1. The import directive name in configuration file is changed from `$include` to `@import`. 
```diff
{
- "$include": "Base.sanaunit",
+  "@import": "Base.sanaunit",
  "general": {
    "websiteUrl": "http://iis_qa:W%2Fw5xF3%7D%26@sandboxqa930.azure.corp.ism.nl"
  }
}
```

2. FILE prefix is now optional for testData configuration.
```diff
- "testData": "file=TestData/TestData.sml"
+ "testData": "TestData/TestData.sml"
```

3. Changed of the config file extension name from `.sanaunit` to `.sanaunit.json` to improve the user experience while working in text editor.
While `.sanaunit` extension is still working, continued use is not welcome.

### Breaking changes
1. The `CustomTestCaseSourceAttribute` attribute is completely removed. Use `SanaTestCaseSourceAttribute` for the same purposes.