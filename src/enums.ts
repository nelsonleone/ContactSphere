export enum AuthFormLocation {
   SIGN_IN =  "signin",
   SIGN_UP = "signup"
}

export enum AlertSeverity {
   ERROR = "error",
   SUCCESS = "success",
   WARNING = "warning"
}


export enum ContactItemLocation {
   Homepage = "homepage",
   HiddenContacts = "hiddenContacts",
   Trash = "trash",
   LabelsPage =  "labelsPage",
   Favourites = "favourites",
   Duplicates = "duplicates"
}

export enum ContactFormAction {
   Create = "create",
   Edit = "edit"
}


export enum SortBy {
   FirstName = "firstName",
   LastName = "lastName",
   Newest = "newest"
}

export enum AuthMethod {
   Google = "googleAuthMethod",
   Email = "EmailAndPasswordAuthMethod",
   PhoneNumber = "PhoneNumberAuthMethod",
   AuthSession = "AuthSessionToken"
}

export enum Breakpoints {
   Large = 1030,
   Medium = 560
}


export enum InputPropertyValueName {
   Name = 'name',
   AddressCountry = 'address.country',
   AddressState = 'address.state',
   AddressCity = 'address.city',
   AddressStreet = 'address.street',
   AddressPostalCode = 'address.postalCode',
   Birthday = 'birthday',
   Email = 'email',
   CompanyName = 'companyName',
   Department = 'department',
   FirstName = 'firstName',
   InTrash = 'inTrash',
   IsActive = 'isActive',
   IsHidden = 'isHidden',
   JobTitle = 'jobTitle',
   LastName = 'lastName',
   LabelledBy = 'labelledBy',
   MiddleName = 'middleName',
   Nickname = 'nickname',
   PhoneNumber = 'phoneNumber',
   Prefix = 'prefix',
   RepPhoto = 'repPhoto',
   RelatedPeople = 'relatedPeople',
   SocialSite = 'social.site',
   SocialHandle = 'social.handle',
   Suffix = 'suffix',
   Website = 'website',
 }
 