import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Category = 'all' | 'houses' | 'toys' | 'accessories';
type Size = 'all' | 'small' | 'medium' | 'large';
type Material = 'all' | 'wood' | 'ceramic' | 'fabric';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  size: string;
  material: string;
  image: string;
  description: string;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Скандинавский домик',
    price: '24 500 ₽',
    category: 'houses',
    size: 'medium',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/98c8f91b-a59c-4d69-9026-53921b4027d2.jpg',
    description: 'Ультрасовременный домик с LED-подсветкой',
    featured: true
  },
  {
    id: 2,
    name: 'Дизайнерская игрушка',
    price: '4 900 ₽',
    category: 'toys',
    size: 'small',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/24860e62-f313-4a03-af73-f6d9039413e8.jpg',
    description: 'Эксклюзивная игрушка из натурального дерева',
    featured: true
  },
  {
    id: 3,
    name: 'Gradient Collection',
    price: '8 200 ₽',
    category: 'accessories',
    size: 'small',
    material: 'ceramic',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/c267181c-aa9f-499b-a1c1-4d94daa71e9d.jpg',
    description: 'Набор керамических мисок с градиентом',
    featured: true
  },
  {
    id: 4,
    name: 'Элегантный домик',
    price: '12 500 ₽',
    category: 'houses',
    size: 'large',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/d58121e2-68dc-448e-81af-53840485b40a.jpg',
    description: 'Классический премиум-домик'
  },
  {
    id: 5,
    name: 'Nature Play Set',
    price: '5 600 ₽',
    category: 'toys',
    size: 'medium',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/8ec55107-5a5b-4132-8354-fe3479540100.jpg',
    description: 'Набор натуральных деревянных игрушек'
  },
  {
    id: 6,
    name: 'Керамика Luxe',
    price: '6 400 ₽',
    category: 'accessories',
    size: 'medium',
    material: 'ceramic',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/e3708b99-d488-46d4-9959-9e13647672a9.jpg',
    description: 'Набор керамических мисок премиум-класса'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
  const [sizeFilter, setSizeFilter] = useState<Size>('all');
  const [materialFilter, setMaterialFilter] = useState<Material>('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;
    if (sizeFilter !== 'all' && product.size !== sizeFilter) return false;
    if (materialFilter !== 'all' && product.material !== materialFilter) return false;
    return true;
  });

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="gradient-mesh fixed inset-0 -z-10" />
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tighter text-gradient">RODENTIA</h1>
            <div className="hidden md:flex gap-8">
              {['home', 'catalog', 'about', 'gallery', 'blog', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-semibold transition-all duration-300 hover:text-primary relative group ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О бренде'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contacts' && 'Контакты'}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-pink-500 transform transition-transform duration-300 ${
                    activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-6 py-2.5 font-semibold shine-effect">
              ✨ Премиум-изделия для грызунов
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Элегантность<br />
              <span className="text-gradient inline-block animate-gradient-shift bg-[length:200%_auto]">
                в каждой детали
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Создаём изделия высокого класса, где стиль встречается с функциональностью
            </p>
            <div className="flex gap-4 justify-center pt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg" 
                onClick={() => scrollToSection('catalog')} 
                className="text-base px-8 py-6 font-semibold bg-gradient-to-r from-primary to-pink-500 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Смотреть коллекцию
                <Icon name="Sparkles" size={18} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('about')}
                className="text-base px-8 py-6 font-semibold backdrop-blur-sm hover:bg-primary/5 hover:scale-105 transition-all duration-300"
              >
                О бренде
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {products.filter(p => p.featured).map((product, idx) => (
              <div 
                key={product.id} 
                className="group relative rounded-3xl overflow-hidden cursor-pointer float-animation"
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-secondary/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <Badge className="bg-white/20 backdrop-blur-sm">{product.price}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              <span className="text-gradient">Каталог</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Тщательно отобранные изделия премиум-класса
            </p>
          </div>

          <div className="mb-16 space-y-8">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground uppercase tracking-wider">Категория</p>
                <div className="flex gap-2">
                  {(['all', 'houses', 'toys', 'accessories'] as Category[]).map((cat) => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(cat)}
                      className={`font-semibold transition-all duration-300 ${
                        categoryFilter === cat 
                          ? 'bg-gradient-to-r from-primary to-pink-500 shadow-lg scale-105' 
                          : 'hover:scale-105'
                      }`}
                    >
                      {cat === 'all' && 'Все'}
                      {cat === 'houses' && 'Домики'}
                      {cat === 'toys' && 'Игрушки'}
                      {cat === 'accessories' && 'Аксессуары'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground uppercase tracking-wider">Размер</p>
                <div className="flex gap-2">
                  {(['all', 'small', 'medium', 'large'] as Size[]).map((size) => (
                    <Button
                      key={size}
                      variant={sizeFilter === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSizeFilter(size)}
                      className={`font-semibold transition-all duration-300 ${
                        sizeFilter === size 
                          ? 'bg-gradient-to-r from-primary to-pink-500 shadow-lg scale-105' 
                          : 'hover:scale-105'
                      }`}
                    >
                      {size === 'all' && 'Все'}
                      {size === 'small' && 'S'}
                      {size === 'medium' && 'M'}
                      {size === 'large' && 'L'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground uppercase tracking-wider">Материал</p>
                <div className="flex gap-2">
                  {(['all', 'wood', 'ceramic', 'fabric'] as Material[]).map((mat) => (
                    <Button
                      key={mat}
                      variant={materialFilter === mat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMaterialFilter(mat)}
                      className={`font-semibold transition-all duration-300 ${
                        materialFilter === mat 
                          ? 'bg-gradient-to-r from-primary to-pink-500 shadow-lg scale-105' 
                          : 'hover:scale-105'
                      }`}
                    >
                      {mat === 'all' && 'Все'}
                      {mat === 'wood' && 'Дерево'}
                      {mat === 'ceramic' && 'Керамика'}
                      {mat === 'fabric' && 'Ткань'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 animate-scale-in cursor-pointer" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-secondary/20 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-pink-500 animate-bounce-slow">
                      <Icon name="Star" size={12} className="mr-1" />
                      Новинка
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <Badge variant="secondary" className="text-base font-bold">{product.price}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs font-semibold">
                      {product.category === 'houses' && '🏠 Домик'}
                      {product.category === 'toys' && '🎮 Игрушка'}
                      {product.category === 'accessories' && '✨ Аксессуар'}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-semibold">
                      {product.material === 'wood' && '🌳 Дерево'}
                      {product.material === 'ceramic' && '🏺 Керамика'}
                      {product.material === 'fabric' && '🧵 Ткань'}
                    </Badge>
                  </div>
                  <Button className="w-full font-semibold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-pink-500 transition-all duration-300" variant="outline">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                <span className="text-gradient">О бренде</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RODENTIA — это воплощение элегантности и заботы о ваших питомцах. Мы создаём премиальные изделия, 
                сочетающие высокую эстетику с функциональностью.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Каждый предмет изготовлен вручную из натуральных материалов, безопасных для грызунов. 
                Наша миссия — превратить уход за питомцами в эстетическое удовольствие.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center space-y-2 animate-bounce-slow">
                  <div className="text-4xl font-black text-gradient">100%</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Натуральные материалы</div>
                </div>
                <div className="text-center space-y-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                  <div className="text-4xl font-black text-gradient">5+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Лет опыта</div>
                </div>
                <div className="text-center space-y-2 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                  <div className="text-4xl font-black text-gradient">2000+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Счастливых клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-pink-500/20 p-1 animate-scale-in float-animation">
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/98c8f91b-a59c-4d69-9026-53921b4027d2.jpg"
                  alt="О бренде"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              <span className="text-gradient">Галерея</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Изделия в интерьере и жизни
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <div 
                key={product.id} 
                className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-secondary/20 group cursor-pointer animate-scale-in hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              <span className="text-gradient">Блог</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Советы и истории о заботе о грызунах
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Как выбрать идеальный домик',
                date: '15 декабря 2024',
                excerpt: 'Руководство по выбору комфортного и безопасного жилища для вашего питомца.',
                icon: 'Home'
              },
              {
                title: 'Натуральные материалы',
                date: '10 декабря 2024',
                excerpt: 'Разбираемся, какие материалы безопасны для грызунов и как их распознать.',
                icon: 'Leaf'
              },
              {
                title: 'Премиум-интерьер',
                date: '5 декабря 2024',
                excerpt: 'Советы по созданию стильного и функционального пространства для питомца.',
                icon: 'Sparkles'
              }
            ].map((post, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-primary/50 group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8 space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                    <Icon name={post.icon as any} size={24} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{post.date}</div>
                  <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <Button variant="link" className="px-0 font-semibold text-primary group-hover:translate-x-2 transition-transform">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              <span className="text-gradient">Контакты</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in">
              {[
                { icon: 'Mail', label: 'Email', value: 'info@rodentia.ru' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67' },
                { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Примерная, д. 1' }
              ].map((contact, idx) => (
                <div key={idx} className="flex gap-5 items-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon name={contact.icon as any} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">{contact.label}</div>
                    <div className="text-muted-foreground">{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <Card className="border-2 animate-scale-in">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Имя</label>
                  <Input placeholder="Введите ваше имя" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Email</label>
                  <Input type="email" placeholder="your@email.com" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашем запросе" rows={4} />
                </div>
                <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-pink-500 hover:shadow-2xl hover:scale-105 transition-all">
                  Отправить
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card/50 backdrop-blur-xl border-t border-border py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="font-black text-2xl text-gradient">RODENTIA</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Премиум-изделия для грызунов
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Каталог</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="hover:text-primary transition-colors cursor-pointer">Домики</div>
                <div className="hover:text-primary transition-colors cursor-pointer">Игрушки</div>
                <div className="hover:text-primary transition-colors cursor-pointer">Аксессуары</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Компания</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="hover:text-primary transition-colors cursor-pointer">О бренде</div>
                <div className="hover:text-primary transition-colors cursor-pointer">Блог</div>
                <div className="hover:text-primary transition-colors cursor-pointer">Контакты</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Соцсети</h4>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <div 
                    key={social}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-pink-500/10 flex items-center justify-center cursor-pointer hover:from-primary hover:to-pink-500 group transition-all duration-300 hover:scale-110"
                  >
                    <Icon name={social as any} size={20} className="group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 RODENTIA. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
