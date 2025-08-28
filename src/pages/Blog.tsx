import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Heart, BookOpen, ChefHat } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'recipes', name: 'Recipes' },
    { id: 'culture', name: 'Culture' },
    { id: 'tips', name: 'Cooking Tips' },
    { id: 'ingredients', name: 'Ingredients' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How to Make Perfect Momos at Home",
      excerpt: "Learn the traditional technique for making Nepal's beloved dumplings with our step-by-step guide.",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Rajesh Gurung",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "recipes",
      likes: 124,
      content: `Momos are the heart and soul of Nepalese cuisine. These delicate steamed dumplings have been bringing families together for generations. Today, I'll share my grandmother's traditional recipe that has been passed down through our family.

## Ingredients for Momo Dough:
- 2 cups all-purpose flour
- 1/2 cup warm water
- 1/2 teaspoon salt
- 1 tablespoon oil

## For the Filling:
- 1 lb ground chicken or vegetables
- 1 large onion, finely chopped
- 3 cloves garlic, minced
- 1 inch ginger, grated
- 2 green chilies, chopped
- 1 teaspoon cumin powder
- 1 teaspoon coriander powder
- Salt and pepper to taste
- Fresh cilantro, chopped

## Instructions:

### Making the Dough:
1. In a large bowl, mix flour and salt
2. Gradually add warm water and oil
3. Knead for 8-10 minutes until smooth
4. Cover and rest for 30 minutes

### Preparing the Filling:
1. Mix all filling ingredients in a bowl
2. Let the mixture rest for flavors to meld
3. The filling should be moist but not wet

### Assembling Momos:
1. Roll dough into small circles
2. Place filling in center
3. Pleat and seal edges carefully
4. Steam for 15-20 minutes

The key to perfect momos is in the pleating technique. Each fold should overlap slightly, creating a beautiful rosette pattern at the top. Don't overfill, as this will make sealing difficult.

Serve hot with traditional tomato-sesame chutney. The contrast of the soft dumpling with the spicy, tangy sauce is what makes momos so special.`
    },
    {
      id: 2,
      title: "The Story Behind Dal Bhat - Nepal's National Dish",
      excerpt: "Discover the cultural significance and regional variations of this beloved comfort food.",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Maya Thapa",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "culture",
      likes: 89,
      content: `Dal Bhat is more than just a meal in Nepal - it's a way of life. This simple yet nourishing combination of lentil soup (dal) and rice (bhat) forms the backbone of Nepalese cuisine and culture.

## The Cultural Significance

In Nepal, the phrase "Dal Bhat Power, 24 Hour" isn't just a joke - it reflects the genuine belief in the sustaining power of this humble meal. Eaten twice daily by millions of Nepalese, dal bhat provides the energy needed for life in the mountains.

## Regional Variations

### Terai Region:
- Uses more vegetables and fish
- Spicier preparations
- Often includes yogurt (dahi)

### Hill Region:
- Features seasonal greens
- Includes pickles (achar)
- Heartier portions

### Mountain Region:
- Incorporates yak cheese
- Uses hardy grains like barley
- Preserved vegetables

## Traditional Preparation

The beauty of dal bhat lies in its simplicity. The dal is typically made with:
- Split yellow lentils (moong dal)
- Turmeric for color and health
- Fresh ginger and garlic
- A tempering (tarka) of cumin and mustard seeds

The accompanying vegetables (tarkari) change with the seasons, ensuring variety and optimal nutrition. During our grandmother's time, meals were planned around what grew in the family garden.

## Health Benefits

Modern nutritionists have confirmed what Nepalese people have known for centuries - dal bhat is a complete protein source. The combination of rice and lentils provides all essential amino acids needed for optimal health.

At Everest Kitchen, we prepare our dal bhat with the same care and tradition as families do in Nepal. Each bowl tells a story of generations who found comfort and strength in this simple, perfect meal.`
    },
    {
      id: 3,
      title: "Essential Nepalese Spices and Where to Find Them",
      excerpt: "A comprehensive guide to the aromatic spices that give Nepalese food its distinctive flavor.",
      image: "https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Karma Lama",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "ingredients",
      likes: 156,
      content: `The aromatic complexity of Nepalese cuisine comes from a carefully balanced blend of spices, many of which are unique to the Himalayan region. Understanding these spices is key to recreating authentic flavors at home.

## Essential Nepalese Spices

### Timur (Sichuan Peppercorns)
Perhaps the most distinctive Nepalese spice, timur provides a unique tingling sensation and citrusy flavor. Found wild in the hills of Nepal, it's essential for dishes like sukuti and gundruk.

### Jimbu (Himalayan Herb)
This dried herb has an onion-like flavor and is crucial for dal and vegetable dishes. It grows only at high altitudes and is considered medicinal.

### Garam Masala (Nepalese Style)
Our version includes:
- Cinnamon bark
- Green and black cardamom
- Cloves
- Bay leaves
- Nutmeg
- Star anise

### Methi (Fenugreek Seeds)
Used both as seeds and dried leaves, methi adds a slightly bitter, maple-like flavor to curries and pickles.

### Hing (Asafoetida)
A tiny pinch transforms any dish, adding an onion-garlic depth. Essential for those following strict vegetarian diets.

## Where to Source These Spices

### In Munich:
- **Asia Shop Maxvorstadt**: Best selection of Nepalese spices
- **Spice Bazaar**: High-quality whole spices
- **Online**: Mountain Path Spices ships authentic Nepalese spices

### What to Look For:
- Whole spices when possible (better flavor retention)
- Recent harvest dates
- Proper packaging (airtight containers)
- Authentic sourcing information

## Storage Tips

1. **Whole vs Ground**: Whole spices last 2-3 years, ground spices 1 year
2. **Storage**: Cool, dark, dry places in airtight containers
3. **Testing**: Smell regularly - vibrant aroma means fresh spices
4. **Grinding**: Grind small batches as needed for maximum flavor

## Creating Your Own Spice Blends

### Basic Nepalese Curry Powder:
- 2 tbsp coriander seeds
- 1 tbsp cumin seeds
- 1 tsp turmeric
- 1 tsp red chili powder
- 1/2 tsp garam masala
- Pinch of timur

Dry roast whole spices before grinding for deeper flavor. The key is balance - no single spice should overpower the others.

At Everest Kitchen, we import many of our specialty spices directly from Nepal, ensuring authenticity and supporting local farmers. Each spice tells a story of the mountains where it grew.`
    },
    {
      id: 4,
      title: "Vegetarian Delights: Plant-Based Nepalese Cooking",
      excerpt: "Explore the rich tradition of vegetarian cuisine in Nepal with these flavorful plant-based recipes.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Maya Thapa",
      date: "February 28, 2024",
      readTime: "7 min read",
      category: "recipes",
      likes: 203,
      content: `Nepal has a rich tradition of vegetarian cooking, influenced by Hindu customs and the abundance of fresh vegetables in the fertile valleys. These plant-based dishes are not just alternatives - they're celebrated centerpieces of Nepalese cuisine.

## Traditional Vegetarian Staples

### Gundruk (Fermented Leafy Greens)
This traditional fermented vegetable soup is a powerhouse of probiotics and flavor:

**Ingredients:**
- 1 cup dried gundruk (or fermented mustard greens)
- 2 tomatoes, chopped
- 2-3 green chilies
- 1 inch ginger, minced
- 2 cloves garlic
- 1 tsp turmeric
- Pinch of timur (Sichuan pepper)

**Method:**
1. Soak gundruk for 30 minutes, then boil until tender
2. In a pan, sauté ginger, garlic, and chilies
3. Add tomatoes and spices
4. Mix in cooked gundruk and simmer
5. Season with timur before serving

### Aloo Tama (Potato and Bamboo Shoot Curry)
A unique combination that showcases Nepal's use of foraged ingredients:

**Key Ingredients:**
- Fresh or dried bamboo shoots (tama)
- Potatoes cut in chunks
- Black-eyed peas
- Turmeric and cumin
- Fresh tomatoes

The bamboo shoots provide a distinctive tangy flavor that pairs beautifully with the earthiness of potatoes.

## Seasonal Vegetarian Dishes

### Spring: Sisnu ko Soup (Nettle Soup)
Young nettle leaves are rich in iron and vitamins. When cooked, they lose their sting and become incredibly nutritious.

### Summer: Pharsi ko Tarkari (Pumpkin Curry)
Sweet pumpkin cooked with minimal spices, allowing the natural sweetness to shine.

### Monsoon: Various Saag (Leafy Greens)
The rains bring an abundance of greens - spinach, mustard leaves, and wild herbs.

### Winter: Preserved Vegetables
Dried and pickled vegetables become essential, showcasing traditional preservation techniques.

## Cooking Techniques

### Tempering (Tarka):
The foundation of many vegetarian dishes starts with heating oil and adding whole spices:
1. Heat mustard oil until smoking
2. Add cumin seeds and let them splutter
3. Add dried chilies and garlic
4. This aromatic base flavors the entire dish

### Slow Cooking:
Many vegetarian dishes benefit from slow, gentle cooking that allows flavors to develop naturally without overpowering the vegetables.

## Nutritional Wisdom

Traditional Nepalese vegetarian meals are nutritionally complete:
- **Proteins**: Combination of legumes and grains
- **Vitamins**: Variety of seasonal vegetables
- **Minerals**: Use of diverse spices and herbs
- **Probiotics**: Fermented foods like gundruk

## Tips for Home Cooking

1. **Use seasonal vegetables**: They taste better and are more affordable
2. **Don't over-spice**: Let the natural flavors shine
3. **Include fermented foods**: They aid digestion and add complexity
4. **Balance textures**: Combine soft and crunchy elements

At Everest Kitchen, our vegetarian menu celebrates this rich tradition. Each dish represents centuries of culinary wisdom, proving that plant-based meals can be both satisfying and deeply flavorful.`
    },
    {
      id: 5,
      title: "The Art of Making Traditional Sel Roti",
      excerpt: "Master the technique of creating Nepal's beloved ring-shaped rice bread for festivals and celebrations.",
      image: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Rajesh Gurung",
      date: "February 20, 2024",
      readTime: "12 min read",
      category: "recipes",
      likes: 178,
      content: `Sel Roti holds a special place in Nepalese culture. This ring-shaped, crispy rice bread is essential for festivals, particularly Tihar (Diwali). The process requires patience and skill, but the results are incredibly rewarding.

## The Cultural Context

Sel Roti is more than food - it's a symbol of prosperity and celebration. Traditionally made by women in the household, the circular shape represents the cycle of life and continuity. The golden color symbolizes wealth and good fortune.

## Ingredients (Makes 8-10 pieces):

### For the Batter:
- 2 cups rice flour (freshly ground preferred)
- 1/2 cup regular flour
- 1/2 cup sugar
- 2 ripe bananas, mashed
- 1/2 cup milk
- 2 tbsp ghee (clarified butter)
- 1/2 tsp ground cardamom
- 1/4 tsp ground cloves
- Pinch of salt

### For Frying:
- Oil for deep frying (traditionally mustard oil)

## The Traditional Method:

### Step 1: Preparing the Rice
Ideally, soak rice overnight, then grind it fresh. The texture should be fine but not powdery. This gives sel roti its distinctive texture.

### Step 2: Making the Batter
1. Mix rice flour and regular flour in a large bowl
2. In another bowl, mash bananas until smooth
3. Add sugar to bananas and mix well
4. Gradually add milk to create a smooth paste
5. Combine with flour mixture
6. Add ghee, spices, and salt
7. Mix to create a thick but pourable batter
8. Let rest for 30 minutes

### Step 3: The Critical Technique
The secret to perfect sel roti lies in the pouring technique:

1. Heat oil to exactly 350°F (175°C)
2. Pour batter into a funnel or use the traditional hand method
3. Create circles by moving your hand in smooth, continuous motions
4. The ring should be about 6 inches in diameter
5. Fry until golden brown on both sides

## Expert Tips:

### Consistency is Key:
- Batter too thick: Sel roti will be dense
- Batter too thin: Won't hold its shape
- Perfect consistency: Flows smoothly but holds form

### Temperature Control:
- Oil too hot: Burns outside, raw inside
- Oil too cool: Absorbs too much oil, becomes soggy
- Perfect temperature: Creates a crispy exterior and fluffy interior

### Traditional Techniques:
1. **Hand Pouring**: Masters can pour perfect circles directly from their palm
2. **Timing**: Each sel roti takes exactly 2-3 minutes per side
3. **Color Guide**: Golden brown like autumn leaves

## Modern Adaptations:

### Healthier Versions:
- Use brown rice flour for added fiber
- Reduce sugar by 25% (still maintains structure)
- Add nuts or seeds for extra nutrition

### Flavor Variations:
- **Coconut Sel Roti**: Add grated coconut to batter
- **Chocolate**: A modern twist with cocoa powder
- **Savory**: Reduce sugar, add herbs and spices

## Storage and Serving:

Fresh sel roti is best consumed within 2-3 days. Store in airtight containers to maintain crispiness. Traditionally served with:
- Yogurt (dahi)
- Tea (particularly milk tea)
- Pickle (achar)
- During festivals, with other sweets

## Troubleshooting Common Problems:

**Problem**: Sel roti breaks while frying
**Solution**: Batter too thin, add more rice flour

**Problem**: Too oily and heavy
**Solution**: Oil temperature too low, increase heat

**Problem**: Uneven shape
**Solution**: Practice the pouring motion, maintain steady hand

## The Festival Connection:

During Tihar, families gather to make sel roti together. It's a time of bonding, with older women teaching younger ones the traditional techniques. The kitchen fills with the aroma of cardamom and ghee, and the golden rings symbolize the warmth of family bonds.

At Everest Kitchen, we make fresh sel roti daily during festival seasons. Each piece is crafted with the same care and tradition as our grandmothers did, connecting our customers to the rich heritage of Nepal through taste and memory.

The art of sel roti reminds us that some things cannot be rushed. Like all good things in life, it requires patience, practice, and love.`
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {!selectedPost ? (
        <>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-r from-red-900 to-orange-800">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop")'
              }}
            ></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <BookOpen className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                <h1 className="text-5xl font-bold mb-6">Food & Culture Blog</h1>
                <p className="text-xl leading-relaxed">
                  Discover authentic recipes, cooking tips, and the rich culinary heritage of Nepal
                </p>
              </motion.div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === 'recipes' ? 'bg-red-100 text-red-700' :
                          post.category === 'culture' ? 'bg-blue-100 text-blue-700' :
                          post.category === 'tips' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {categories.find(cat => cat.id === post.category)?.name || post.category}
                        </span>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-red-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Blog Post Detail View */
        <article className="max-w-4xl mx-auto px-4 py-12">
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-8 flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <span>← Back to Blog</span>
          </button>
          
          <div className="aspect-video mb-8 overflow-hidden rounded-xl">
            <img 
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              selectedPost.category === 'recipes' ? 'bg-red-100 text-red-700' :
              selectedPost.category === 'culture' ? 'bg-blue-100 text-blue-700' :
              selectedPost.category === 'tips' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {categories.find(cat => cat.id === selectedPost.category)?.name || selectedPost.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{selectedPost.title}</h1>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <ChefHat className="h-5 w-5" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{selectedPost.readTime}</span>
              </div>
              <span>{selectedPost.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart className="h-5 w-5" />
              <span>{selectedPost.likes} likes</span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {selectedPost.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.startsWith('#### ')) {
                return <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>;
              } else if (paragraph.startsWith('- ')) {
                return <li key={index} className="text-gray-700 mb-2">{paragraph.replace('- ', '')}</li>;
              } else if (paragraph.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>;
              }
            })}
          </div>
          
          <div className="mt-12 pt-8 border-t bg-red-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Try This Recipe at Everest Kitchen</h3>
            <p className="text-gray-600 mb-6">
              Can't wait to try making this at home? Visit us to taste the authentic version prepared by our expert chefs, 
              or order for pickup/delivery to enjoy these flavors today!
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setSelectedPost(null)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                View Our Menu
              </button>
              <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Order Now
              </button>
            </div>
          </div>
        </article>
      )}
    </motion.div>
  );
};

export default Blog;