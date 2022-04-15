# Strapi plugin mktlng

The Markets & Languages (mktlng) plugin allows Strapi users to create, manage and distribute localized content in different languages, called "locales". For more information about the concept of internationalization, please refer to the [W3C definition](https://www.w3.org/International/questions/qa-mktlng.en#mktlng).

## Features

- Admin panel users can create several localized versions of their content
- Developers can build localized projects by fetching and consuming the right content depending on the country/language of the audience

## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application:

```sh
# Using Yarn
yarn add @strapi/plugin-mktlng

# Or using NPM
npm install @strapi/plugin-mktlng
```

Then, you'll need to build your admin panel:

```sh
# Using Yarn
yarn build

# Or using NPM
npm run build
```

## Documentation

- [Developer documentation](https://docs.strapi.io/developer-docs/latest/plugins/mktlng.html#installation)
- [User documentation](https://docs.strapi.io/user-docs/latest/content-manager/translating-content.html)
