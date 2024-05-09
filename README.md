# shiki_example

This is a simple vue application, that is deployed at [shiki.mrjackwills.com](https://shiki.mrjackwills.com).

The page *should* display two code blocks. The first using [prismJS](https://github.com/PrismJS/prism), the second [shiki](https://github.com/shikijs/shiki)

I have included the [nginx conf](shiki.mrjackwills.com.conf), as I am using nginx to insert a unique random nonce into each request.

If you visit [shiki.mrjackwills.com](https://shiki.mrjackwills.com), you'll notice that the shiki code block doesn't load, due to csp issues.