---
date: "10-10-2023"
title: "Checker"
lang: "Build with C#"
description: "This project is an interactive web application developed with Blazor WebAssembly, utilizing Fluxor for state management and including custom services for authentication and handling HTTP requests."
image: "/images/project/03.jpg"
color: "#BF4106"
category: "Frontend"

projectInfo:
  - title: "Client"
    data: "World wide"
  - title: "Timeline"
    data: "In progress, but ready for tests"
  - title: "Tehnology"
    data: |
      - Blazor
      - Fluxor 
      - Bootstrap  
  - title: "Functions"
    data: |
      - Post Like
      - User Account
      - Activity track
      - Share post 
live:
  - link: "https://checker.gabrielchiorcea.tech/"
---


<div class="image columns-1 sm:columns-2 gap-8">


![C# 02.](/images/project/03-02.jpg)
![C# 01.](/images/project/03-01.jpg)
![C# 03.](/images/project/03-03.jpg)
![C# 03.](/images/project/03-04.jpg)


</div>


## Project Overview

Checker is a web application designed to manage user profiles and account settings. It provides functionalities for viewing and updating profile information, changing passwords, and deleting accounts. The application aims to offer a seamless user experience with a responsive design.



## Program.cs Description

The Program.cs file is the entry point for a Blazor WebAssembly application. It configures the root components, sets up services, configures Fluxor for state management, and sets the logging configuration. Finally, it builds and runs the application asynchronously. This file ensures that the application is properly initialized and configured before it starts running.

Key Components:
1. Root Components
2. Service Configuration
3. Fluxor Configuration
4. Logging Configuration
5. Application Initialization
6. Description of Visible Code
7. Root Components

The root components of the Blazor application are added to the component tree. These components are the entry points for the application and are rendered in the specified HTML elements.

```C
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
```
* App: The main application component, rendered in the HTML element with the ID app.

* HeadOutlet: A component for rendering content in the HTML <head> element, rendered after the existing content.


Service Configuration
Services are configured and added to the dependency injection container. These services can be injected into components and other services throughout the application.

```C#
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<FetchService>();
builder.Services.AddScoped<AuthenticationTocken>();
```

* HttpClient: Configured with the base address of the host environment.
* FetchService: A custom service for handling HTTP requests.
* AuthenticationTocken: A custom service for managing authentication tokens.


Fluxor Configuration
Fluxor, a state management library for Blazor, is configured and added to the services.
```C#
builder.Services.AddFluxor(o =>
{
    o.ScanAssemblies(typeof(Program).Assembly);
    o.UseReduxDevTools();
});
```

* ScanAssemblies: Scans the specified assembly for Fluxor-related classes (e.g., actions, reducers, effects).
* UseReduxDevTools: Enables Redux DevTools integration for state debugging.


Logging Configuration
The logging configuration is set to a minimum level of Information.
```C#
builder.Logging.SetMinimumLevel(LogLevel.Information);
```
Application Initialization
The application is built and run asynchronously.

```C#
await builder.Build().RunAsync();
```


## Pages

The Signup.razor file is a Blazor component that handles the user sign-up process. This component includes a form where users can enter their email, username, and password to create a new account. The component also manages the state of the form, including validation and error handling.

Key Components:
1. Form Fields: The form includes input fields for the user's email, username, and password.
State Management: The component manages the state of the form fields, including validation states and error messages.
2. Event Handling: The component includes methods to handle form submission and validation.

3. UI Feedback: The component provides visual feedback to the user based on the validation state of the form fields.

Description of Visible Code
1. Message Handling: The code sets a message to "false" and updates the styleClassUsername to indicate a valid username. It also sets the userName flag to true.
2. Exception Handling: The code includes a try-catch block to handle exceptions during the verification process, logging any errors to the console.
3. State Management: The stateManager method updates the state of the form, resetting the style classes for the email and username input fields to their default state.

The Signup.razor component is responsible for handling the user sign-up process in a Blazor application. It includes form fields for user input, manages the state of these fields, handles form submission and validation, and provides visual feedback to the user. The visible code snippet shows how the component updates the state and handles exceptions during the verification process.

ProfileRender.razor Description
The ProfileRender.razor component is responsible for rendering the user's profile information in a Blazor application. This component typically includes the following functionalities:

1. Profile Data Fetching: The component fetches the user's profile data from a service or state management store when the component is initialized.
2. Profile Display: The component displays the user's profile information, such as name, email, and other relevant details, in a structured format.
3. Profile Update: The component may include functionality to update the user's profile information, allowing users to edit and save changes to their profile.
4. DOM Manipulation: The ProfileDom method is likely used to manipulate or render the profile DOM structure, ensuring that the profile information is displayed correctly and dynamically updated based on user interactions or other events.

Key Components
1. Profile Data Fetching: The component fetches the user's profile data, using FetchService.
2. Profile Display: The component displays the profile information in a user-friendly format, such as a form or a set of labeled fields.
3. Profile Update: The component may provide input fields and buttons to allow users to update their profile information.
4. DOM Manipulation: The ProfileDom method is used to handle any necessary DOM manipulations to ensure the profile information is displayed and updated correctly.

The ProfileRender.razor component is a crucial part of the user interface in a Blazor application, responsible for displaying and managing the user's profile information. It fetches the profile data, displays it in a structured format, and may provide functionality for users to update their profile information. The ProfileDom method is used to handle any necessary DOM manipulations, ensuring that the profile information is displayed and updated correctly based on user interactions or other events.


## HTTP

The http request are defines by  FetchService class in the Checker.Services namespace. The class is designed to handle HTTP requests and interactions with JavaScript runtime in a Blazor WebAssembly application.

Here are the key components:

Namespaces: The code imports several namespaces required for HTTP operations, JSON handling, state management, and JavaScript interop.

1. System.Net
2. System.Net.Http.Headers
3. System.Net.Http.Json
4. Checker.Models
5. Checker.state
6. Fluxor
7. Microsoft.JSInterop
Namespace Declaration: The FetchService class is declared within the Checker.Services namespace.

Class Declaration: The FetchService class is declared as a public class.

Private Fields:

_httpClinet: A private readonly field of type HttpClient for making HTTP requests.

_jsRuntime: A private readonly field of type IJSRuntime for interacting with JavaScript. 

Constructor: The constructor initializes the _httpClinet and _jsRuntime fields with the provided HttpClient and IJSRuntime instances.

## Method

### LoginAsync

This method handles user login by sending a POST request with the login model and returns a token.

```C#
public async Task<JsonModel> LoginAsync(LoginModel loginModel)
{
    var response = await _httpClinet.PostAsJsonAsync($"{AppSettings.ApiBaseUrl}/creare-cont", loginModel);
    response.EnsureSuccessStatusCode();
    var token = await response.Content.ReadFromJsonAsync<JsonModel>();
    return token;
}
```
### SignUpAsync
This method handles user sign-up by sending a POST request with the sign-up model and returns a response model.

```C#
public async Task<SignUpResponseModel> SignUpAsync(SignUpModel signUpModel)
{
    var response = await _httpClinet.PostAsJsonAsync($"{AppSettings.ApiBaseUrl}/inregistrare", signUpModel);
    response.EnsureSuccessStatusCode();
    var result = await response.Content.ReadFromJsonAsync<SignUpResponseModel>();
    return result;
}
```

## Additional Methods like

### GetUserProfileAsync

This method retrieves the user's profile by sending a GET request.
```C#
public async Task<UserProfileModel> GetUserProfileAsync(string token)
{
    var request = new HttpRequestMessage(HttpMethod.Get, $"{AppSettings.ApiBaseUrl}/profil");
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    var response = await _httpClinet.SendAsync(request);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadFromJsonAsync<UserProfileModel>();
}
```

### UpdateUserProfileAsync

This method updates the user's profile by sending a PUT request with the updated profile model.

```C#
public async Task<HttpResponseMessage> UpdateUserProfileAsync(UserProfileModel profileModel, string token)
{
    var request = new HttpRequestMessage(HttpMethod.Put, $"{AppSettings.ApiBaseUrl}/profil");
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    request.Content = JsonContent.Create(profileModel);
    return await _httpClinet.SendAsync(request);
}
```
The FetchService class provides a comprehensive set of methods for handling user authentication and profile management. These methods include logging in, signing up, retrieving user profiles, updating profiles, and logging out. Each method is designed to perform specific tasks by making appropriate HTTP requests or interacting with JavaScript, ensuring a clean and reusable service layer within the Blazor WebAssembly application.


## State management

The state management in this code is implemented using the Fluxor library, which is a state management library for Blazor applications. The code defines reducers that handle specific actions to update the application's state.


Let's focus on the ProfileCardState and how is used in the context of state management with Fluxor.

### ProfileCardState
The ProfileCardState likely represents the state of a user's profile card in the application. This state could include information such as the user's profile details, loading status, and any errors.

Description
ProfileCardState Definition:

The ProfileCardState class is defined in the State.cs file. It includes properties like HomeAddress, Country, County, Occupation, FullName, Email, Image, and various social media links.
```C#
public class ProfileCardState
{
    public string HomeAddress { get; set; }
    public string Country { get; set; }
    public string County { get; set; }
    public string Occupation { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public byte[] Image { get; set; }
    public string LinkedIn { get; set; }
    public string FaceBook { get; set; }
    public string GitHub { get; set; }
    public string Instagram { get; set; }
    public string Twitter { get; set; }
    public string Youtube { get; set; }
    public string Description { get; set; }

    public ProfileCardState(string homeAddress, string country, string county, string occupation, string fullname, string email, byte[] image, string linkedIn, string faceBook, string gitHub, string instagram, string twitter, string youtube, string description)
    {
        HomeAddress = homeAddress;
        Country = country;
        County = county;
        Occupation = occupation;
        Image = image;
        FullName = fullname;
        Email = email;
        LinkedIn = linkedIn;
        FaceBook = faceBook;
        GitHub = gitHub;
        Instagram = instagram;
        Twitter = twitter;
        Youtube = youtube;
        Description = description;
    }

    public ProfileCardState() { }
}
```


It has constructors to initialize these properties, including a parameterless constructor for flexibility.


Feature Initialization:

The ProfileCardFeature class, defined in the Feature.cs file, specifies the initial state of ProfileCardState with default values.

```C#
using Fluxor;

namespace Checker.state
{
    public class ProfileCardFeature : Feature<ProfileCardState>
    {
        public override string GetName() => "ProfileCard";

        protected override ProfileCardState GetInitialState() =>
            new ProfileCardState(
                string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, new byte[0], 
                string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, 
                string.Empty
            );
    }
}
```

Reducers:

The ProfileCardReducer class, found in the Reducers.cs file, handles state changes. The ReduceProfileCard method updates the state based on the GetProfileCardState action by creating a new ProfileCardState with updated values.
```C#
using Fluxor;

namespace Checker.state
{
    public static class ProfileCardReducer
    {
        [ReducerMethod]
        public static ProfileCardState ReduceProfileCard(ProfileCardState state, GetProfileCardState action)
        {
            return new ProfileCardState(
                action.State.HomeAddress,
                action.State.Country,
                action.State.County,
                action.State.Occupation,
                action.State.FullName,
                action.State.Email,            
                action.State.Image,
                action.State.LinkedIn,
                action.State.FaceBook,
                action.State.GitHub,
                action.State.Instagram,
                action.State.Twitter,
                action.State.Youtube,
                action.State.Description
            );
        }
    }
}
```



Usage in Components:

In various Razor components like ProfileRender.razor, HomeRender.razor, and AdminRender.razor, the ProfileCardState is injected and used to display profile information.
These components fetch user data from the server and dispatch actions to update the state. For example, when the profile page is loaded, it checks the authentication token and fetches the user's profile data to update the state.

```C#
@page "/profile"

@using Checker.Pages.Message
@using global::Checker.state
@using global::Checker.Models 
@using global::Checker.Services
@using global::Checker.features
@using Fluxor
@inject AuthenticationTocken authenticationtocken
@inject IState<ProfileCardState> ProfileCardState

@inject FetchService fetchService
@inject IDispatcher Dispatcher

@if(error == false){
    @if(isLoading){
        <BlazorChecking/>
    } else if(tokenState){
        <ProfileDom/>
    }else{
        <Restricted/>
    }
}else{
    <BlazorError/>
}

@code{
    bool isLoading = true;
    bool error = false;
    bool tokenState;
    protected override async Task OnInitializedAsync()
    {
        tokenState = await authenticationtocken.Check();
        
        if(!string.IsNullOrEmpty(ProfileCardState.Value.FullName)){
            isLoading = false;
            return;
        }

        string tokenString = await authenticationtocken.GetTocken();
        if(tokenState){
            try{
                var response = await fetchService.GetResponsSocialCard($"{AppSettings.ApiBaseUrl}/get", tokenString);
                Dispatcher.Dispatch(new GetProfileCardState(response));
                if(response != null){
                    isLoading = false;
                }else{
                    throw new Exception("eroare");
                }
            } catch (Exception) {
                error = true;
                return;
            }
        }else{
            isLoading = false;
        }
    }
}
```
This setup ensures consistent management and updating of the profile information across the application using Fluxor.




