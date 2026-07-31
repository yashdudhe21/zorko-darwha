// ---------------------------------------------------------------------------
// Zorko Darwha — one-off menu importer (with stock images)
//
// Uploads each stock photo as a Sanity image asset (de-duplicated) and
// creates every menu item with the image attached. Idempotent: it uses
// deterministic document IDs, so re-running updates the same docs.
//
// USAGE (from the studio/ folder, where @sanity/client is installed):
//   1. Create a token: sanity.io/manage -> project aghzsrff -> API -> Tokens
//      -> Add API token -> role "Editor" -> copy it.
//   2. Run:  SANITY_TOKEN=your_token_here node import-menu.mjs
//
// Requires Node 18+ (uses global fetch). The token is read from the
// environment and never stored in this file.
// ---------------------------------------------------------------------------
import {createClient} from '@sanity/client'

const token = process.env.SANITY_TOKEN || process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('\nMissing token. Run:  SANITY_TOKEN=xxxx node import-menu.mjs')
  console.error('Create one at sanity.io/manage -> project aghzsrff -> API -> Tokens (role: Editor)\n')
  process.exit(1)
}

const client = createClient({
  projectId: 'aghzsrff',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const items = [
  {
    "name": "Mexican King Burger",
    "category": "Burger",
    "price": 79,
    "description": "The ultimate burger packed with a tsunami of flavor & succulence — veg patty, fresh veggies, and ZORKO special sauces.",
    "tag": "Best Seller",
    "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Spicy Salsa Barbeque Burger",
    "category": "Burger",
    "price": 79,
    "description": "A smoky barbeque patty loaded with zesty salsa and ZORKO special sauces for a bold, spicy bite.",
    "image": "https://images.unsplash.com/photo-1627754468549-6ed1a4813a53?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Burger",
    "category": "Burger",
    "price": 69,
    "description": "A Korean-style veg patty with a sweet-spicy gochujang glaze and crunchy slaw.",
    "image": "https://images.unsplash.com/photo-1595834894604-6a38962cb666?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Double Tikki Burger",
    "category": "Burger",
    "price": 79,
    "description": "Two crispy veg tikki patties stacked high with fresh veggies and house sauces.",
    "image": "https://images.unsplash.com/photo-1591972619306-0a13c4ab5c1a?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Classic OG Burger",
    "category": "Burger",
    "price": 49,
    "description": "Budget-friendly local favorite layered with a delicious vegetable patty, fresh veggies, and ZORKO special sauces.",
    "image": "https://images.unsplash.com/photo-1552422273-f56265a5f375?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Royal Paneer Grilled Burger",
    "category": "Burger",
    "price": 149,
    "description": "A grilled paneer patty finished with exotic sauces for our most indulgent burger yet.",
    "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Peri Peri French Fries",
    "category": "Fries",
    "price": 99,
    "description": "Golden, crispy fries tossed in extra spicy African peri peri seasoning.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Salted French Fries",
    "category": "Fries",
    "price": 79,
    "description": "Classic golden fries, perfectly salted and served piping hot.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Cheesy Fries",
    "category": "Fries",
    "price": 149,
    "description": "Crinkle fries smothered in a creamy Korean-style cheese sauce.",
    "tag": "NEW",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Sizzling Italian Fries",
    "category": "Fries",
    "price": 129,
    "description": "Fries tossed in Italian herbs and seasoning, served sizzling hot.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Mexican Salsa Wrap",
    "category": "Wraps",
    "price": 129,
    "description": "A soft tortilla wrap packed with Mexican-spiced veggies and tangy salsa.",
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Classic Veg Wrap",
    "category": "Wraps",
    "price": 109,
    "description": "Fresh crunchy veggies rolled up in a soft tortilla with house sauces.",
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Grilled Paneer Wrap",
    "category": "Wraps",
    "price": 149,
    "description": "Marinated paneer tossed in ZORKO exotic sauce with fresh crunchy veggies and spices.",
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Veg Exotica Pizza",
    "category": "Pizza",
    "price": 149,
    "description": "A vibrant thin-crust pizza loaded with exotic fresh vegetables.",
    "tag": "Best Seller",
    "image": "https://images.unsplash.com/photo-1617343251257-b5d709934ddd?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Paneer Barbeque Pizza",
    "category": "Pizza",
    "price": 149,
    "description": "Smoky barbeque paneer chunks over melted mozzarella.",
    "tag": "Best Seller",
    "image": "https://images.unsplash.com/photo-1611007304706-279fe3d29bda?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Hot Te Hell Pizza",
    "category": "Pizza",
    "price": 149,
    "description": "For spice lovers — a fiery blend of chillies and peppers on a bubbling cheese base.",
    "image": "https://images.unsplash.com/photo-1743615357618-de4ac111c79c?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Pizza Di Sicilia",
    "category": "Pizza",
    "price": 129,
    "description": "Ultra thin crust pizza loaded with exotic fresh veggies and a punch of red paprika.",
    "subtitle": "World's Thinnest Pizza",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Margherita",
    "category": "Pizza",
    "price": 89,
    "description": "The timeless classic — tomato, mozzarella, and basil on a golden crust.",
    "image": "https://images.unsplash.com/photo-1694717065203-8cb0de9918f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "The Xplod",
    "category": "Pizza",
    "price": 169,
    "description": "An explosion of toppings, sauces, and melted cheese in every bite.",
    "image": "https://images.unsplash.com/photo-1743615357602-f0711d1bc06f?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Golden Harvest Pizza",
    "category": "Pizza",
    "price": 169,
    "description": "A hearty harvest of seasonal vegetables over our signature golden crust.",
    "subtitle": "Self Made",
    "image": "https://images.unsplash.com/photo-1635832801146-102d3bb7f88e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Four Cheese Pizza",
    "category": "Pizza",
    "price": 169,
    "description": "A rich, gooey blend of four cheeses for the ultimate cheese-lover's pizza.",
    "image": "https://images.unsplash.com/photo-1617470703152-7bc3ab20893e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Pizza",
    "category": "Pizza",
    "price": 169,
    "description": "A fusion pizza topped with sweet-spicy Korean-style sauce and veggies.",
    "image": "https://images.unsplash.com/photo-1617470703245-ed7bc56788e9?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Steam Momos",
    "category": "Momos",
    "price": 89,
    "description": "Handcrafted steamed dumplings packed with finely minced garden fresh veggies.",
    "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Fried Momos",
    "category": "Momos",
    "price": 89,
    "description": "Crispy pan-fried dumplings served with spicy red chutney.",
    "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Melting Gravy Momos",
    "category": "Momos",
    "price": 149,
    "description": "Momos smothered in a rich, melting cheese gravy.",
    "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Volcano Kulhad Momos",
    "category": "Kulhad",
    "price": 149,
    "description": "Handcrafted fried momos tossed in special creamy cheese sauce, stuffed inside a traditional clay kulhad, topped with mozzarella and baked.",
    "image": "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Loaded Kulhad Pizza",
    "category": "Kulhad",
    "price": 149,
    "description": "Our signature pizza, baked and served bubbling hot in a traditional clay kulhad.",
    "image": "https://images.unsplash.com/photo-1617470702355-94a48c0b9729?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Chatori Kulhad Maggi",
    "category": "Kulhad",
    "price": 149,
    "description": "Cheesy masala Maggi noodles served sizzling in a traditional clay kulhad.",
    "image": "https://images.unsplash.com/photo-1585410304004-56ae05651552?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Veg Mexican Sandwich",
    "category": "Sandwiches",
    "price": 129,
    "description": "A grilled sandwich packed with Mexican-spiced vegetables and melted cheese.",
    "image": "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Paneer Maharaja Sandwich",
    "category": "Sandwiches",
    "price": 149,
    "description": "A royal grilled sandwich stuffed with spiced paneer and fresh veggies.",
    "image": "https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Veggie Mumbai Grilled Sandwich",
    "category": "Sandwiches",
    "price": 149,
    "description": "Mumbai street-style grilled sandwich loaded with veggies and chutneys.",
    "image": "https://images.unsplash.com/photo-1709689156424-16fe0e05b47b?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Chilli Sandwich",
    "category": "Sandwiches",
    "price": 129,
    "description": "A gooey, spicy grilled sandwich loaded with cheese and green chillies.",
    "image": "https://images.unsplash.com/photo-1700937314577-898450cafe35?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Alfredo",
    "category": "Pasta",
    "price": 139,
    "description": "Creamy white sauce pasta finished with herbs and parmesan.",
    "subtitle": "White Sauce",
    "image": "https://images.unsplash.com/photo-1570549986390-6bd150ac3515?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Arrabbiata",
    "category": "Pasta",
    "price": 139,
    "description": "A fiery tomato-based pasta with garlic and chilli flakes.",
    "subtitle": "Red Sauce",
    "image": "https://images.unsplash.com/photo-1528738064262-9f834cbdfda1?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Ala Rosey",
    "category": "Pasta",
    "price": 139,
    "description": "A silky blend of red and white sauces for the best of both worlds.",
    "subtitle": "Pink Sauce",
    "image": "https://images.unsplash.com/photo-1573821201069-dbf297ca410a?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Peri Peri Pasta",
    "category": "Pasta",
    "price": 139,
    "description": "Pasta tossed in a spicy peri peri seasoning for a bold kick.",
    "image": "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Garlic Bread",
    "category": "Garlic Bread",
    "price": 89,
    "description": "Toasted garlic bread topped with melted cheese.",
    "image": "https://images.unsplash.com/photo-1556008531-57e6eefc7be4?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Supreme Treat Garlic Bread",
    "category": "Garlic Bread",
    "price": 129,
    "description": "Loaded garlic bread topped with veggies and extra cheese.",
    "image": "https://images.unsplash.com/photo-1587676353811-1708ddf47031?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Paneer Toofani Garlic Bread",
    "category": "Garlic Bread",
    "price": 149,
    "description": "Garlic bread piled high with spicy paneer and melted cheese.",
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Pull & Tear Garlic Bun",
    "category": "Special Buns",
    "price": 149,
    "description": "A shareable pull-apart bun stuffed and topped with gooey garlic cheese.",
    "image": "https://images.unsplash.com/photo-1707886114218-fb2bcfbcb1e7?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Jalapeno Bun",
    "category": "Special Buns",
    "price": 149,
    "description": "A soft baked bun with a spicy Korean jalapeno-cheese filling.",
    "image": "https://images.unsplash.com/photo-1716393374741-02f485f25d61?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Spicy Paneer",
    "category": "Toastie",
    "price": 129,
    "description": "A grilled toastie stuffed with Korean-spiced paneer and veggies.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Peri Peri Cheese Blast",
    "category": "Toastie",
    "price": 99,
    "description": "A cheesy toastie with a spicy peri peri kick.",
    "image": "https://images.unsplash.com/photo-1665233272941-ae681d11fc06?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Italian Treat",
    "category": "Toastie",
    "price": 79,
    "description": "A herby, cheesy toastie inspired by Italian flavors.",
    "image": "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheesy Delight Nachos",
    "category": "Nachos",
    "price": 129,
    "description": "Crispy nachos loaded with molten cheese.",
    "image": "https://images.unsplash.com/photo-1775708856908-aafcf9baa5d0?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Nachos with Cheese Dip",
    "category": "Nachos",
    "price": 79,
    "description": "Crispy tortilla chips served with a warm, creamy cheese dip.",
    "image": "https://images.unsplash.com/photo-1775708856908-aafcf9baa5d0?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Nachos & Salsa",
    "category": "Nachos",
    "price": 149,
    "description": "Loaded nachos topped with fresh, tangy salsa and cheese.",
    "image": "https://images.unsplash.com/photo-1775708856908-aafcf9baa5d0?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Veg Masala Maggi",
    "category": "Maggi",
    "price": 69,
    "description": "Classic masala Maggi noodles cooked with fresh vegetables.",
    "image": "https://images.unsplash.com/photo-1585410304004-56ae05651552?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Hot Passion Spicy Maggi",
    "category": "Maggi",
    "price": 69,
    "description": "Fiery spicy Maggi for those who love the heat.",
    "image": "https://images.unsplash.com/photo-1692273212247-f5efb3fc9b87?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Double Masala Maggi",
    "category": "Maggi",
    "price": 89,
    "description": "Extra masala, extra flavor — a double dose of our signature spice mix.",
    "image": "https://images.unsplash.com/photo-1708608291875-3be71a930202?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cheese Chatori Maggi",
    "category": "Maggi",
    "price": 99,
    "description": "Masala Maggi loaded with melted cheese for the ultimate comfort bowl.",
    "image": "https://images.unsplash.com/photo-1603033172872-c2525115c7b9?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Premium Cold Coffee",
    "category": "Cold Coffee",
    "price": 49,
    "description": "Rich, creamy, thick blended cold coffee served chilled in a cafe-style cup.",
    "image": "https://images.unsplash.com/photo-1527156231393-7023794f363c?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Strong Cold Coffee",
    "category": "Cold Coffee",
    "price": 59,
    "description": "An extra-strong blend for serious coffee lovers.",
    "image": "https://images.unsplash.com/photo-1527156231393-7023794f363c?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Chocolate Cold Coffee",
    "category": "Cold Coffee",
    "price": 79,
    "description": "Cold coffee blended with rich chocolate for a decadent treat.",
    "image": "https://images.unsplash.com/photo-1527156231393-7023794f363c?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Surprise Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A fizzy, icy, refreshing mystery blend of fresh mint, lime, and our secret fruit syrup.",
    "tag": "Best Seller",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Korean Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A fusion twist on the classic mojito with a hint of Korean fruit syrup.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Strawberry Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Fresh mint and lime with a burst of strawberry sweetness.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Tangy Mango Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A tangy mango twist on our fizzy, minty mojito.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Pineapple Punch Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Sweet pineapple meets fresh mint and lime for a tropical punch.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Mary Litchi Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Fragrant litchi syrup blended into our classic fizzy mojito base.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Mint Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A refreshing blend of fresh mint leaves, zesty lime juice, sugar, and sparkling soda over crushed ice.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Orange Cinderella Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A citrusy orange twist on our signature fizzy mojito.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Blue Heaven Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A dreamy blue-hued mojito with a fruity blue curacao-style syrup.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Rose Petal Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "A floral rose-infused twist on the classic mojito.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cranberry Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Tart cranberry syrup shaken into our fizzy mint-lime mojito.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Passion Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Exotic passion fruit syrup blended into our signature mojito.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Peach Mojito",
    "category": "Mojito",
    "price": 49,
    "description": "Juicy peach syrup meets fresh mint and lime.",
    "image": "https://images.unsplash.com/photo-1753263453239-fef8e92b5040?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Oreo Chocolate Shake",
    "category": "Milk Shakes",
    "price": 99,
    "description": "A thick chocolate shake blended with crushed Oreo cookies.",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Rose Delight Shake",
    "category": "Milk Shakes",
    "price": 99,
    "description": "A fragrant, creamy shake infused with rose syrup.",
    "image": "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Strawberry Shake",
    "category": "Milk Shakes",
    "price": 109,
    "description": "A classic thick and creamy strawberry milkshake.",
    "image": "https://images.unsplash.com/photo-1591864384134-8a21ffb51cb5?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Kitkat Chocolate Shake",
    "category": "Milk Shakes",
    "price": 109,
    "description": "A rich chocolate shake loaded with crushed Kitkat.",
    "image": "https://images.unsplash.com/photo-1696487773677-c0c8061fe3d2?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Brownie Blast Shake",
    "category": "Milk Shakes",
    "price": 119,
    "description": "A decadent shake blended with chunks of fudgy brownie.",
    "image": "https://images.unsplash.com/photo-1634112957296-3f60457b21e6?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Lemon Ice Tea",
    "category": "Ice Tea",
    "price": 49,
    "description": "A crisp, refreshing lemon iced tea.",
    "image": "https://images.unsplash.com/photo-1592099759599-24b131b8e824?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Peach Ice Tea",
    "category": "Ice Tea",
    "price": 49,
    "description": "Sweet peach flavor meets classic chilled iced tea.",
    "image": "https://images.unsplash.com/photo-1592099759599-24b131b8e824?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Passion Fruit Ice Tea",
    "category": "Ice Tea",
    "price": 49,
    "description": "Exotic passion fruit blended into a chilled iced tea.",
    "image": "https://images.unsplash.com/photo-1592099759599-24b131b8e824?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Cranberry Ice Tea",
    "category": "Ice Tea",
    "price": 49,
    "description": "Tart cranberry flavor in a refreshing chilled iced tea.",
    "image": "https://images.unsplash.com/photo-1592099759599-24b131b8e824?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "American Blue Ice Tea",
    "category": "Ice Tea",
    "price": 49,
    "description": "A fruity blue-hued iced tea with a cool, refreshing finish.",
    "image": "https://images.unsplash.com/photo-1592099759599-24b131b8e824?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Hot Coffee",
    "category": "Hot",
    "price": 29,
    "description": "A comforting cup of freshly brewed hot coffee.",
    "image": "https://images.unsplash.com/photo-1596098823457-74e360fcd023?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Hot Chocolate",
    "category": "Hot",
    "price": 39,
    "description": "Rich, warm, and creamy hot chocolate.",
    "image": "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Sizzling Brownie",
    "category": "Desserts",
    "price": 149,
    "description": "Rich chocolate brownie served sizzling hot with ice cream.",
    "image": "https://images.unsplash.com/photo-1566855833528-35bcc17ae9ce?q=80&w=800&auto=format&fit=crop"
  },
  {
    "name": "Special Kulhad Chocolate Mud Pie",
    "category": "Desserts",
    "price": 169,
    "description": "A decadent layered chocolate mud pie served in a traditional clay kulhad.",
    "image": "https://images.unsplash.com/photo-1732105094945-a22182f23169?q=80&w=800&auto=format&fit=crop"
  }
]

function slug(x) {
  return String(x).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Cache uploads by URL so a shared photo is only uploaded once.
const assetCache = new Map()
async function uploadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, {filename: slug(url).slice(0, 40) + '.jpg'})
  assetCache.set(url, asset._id)
  return asset._id
}

const seen = {}
let ok = 0, failImg = 0
for (let i = 0; i < items.length; i++) {
  const it = items[i]
  let id = 'menu-' + slug(it.name)
  if (seen[id]) id = id + '-' + i
  seen[id] = 1

  const doc = {
    _type: 'menuItem',
    _id: id,
    name: it.name,
    category: it.category,
    price: it.price,
    description: it.description,
    order: i + 1,
  }
  if (it.subtitle) doc.subtitle = it.subtitle
  if (it.tag === 'Best Seller') doc.isBestSeller = true

  if (it.image) {
    try {
      const assetId = await uploadImage(it.image)
      doc.image = {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
    } catch (e) {
      failImg++
      console.warn('  ! image failed for', it.name, '-', e.message)
    }
  }

  await client.createOrReplace(doc)
  ok++
  console.log('✓', (i + 1) + '/' + items.length, it.name)
}
console.log('\nDone. ' + ok + ' items imported' + (failImg ? ' (' + failImg + ' without images)' : '') + '.')
