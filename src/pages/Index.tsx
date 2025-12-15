import { useState } from 'react';
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
}

const products: Product[] = [
  {
    id: 1,
    name: 'Элегантный домик',
    price: '12 500 ₽',
    category: 'houses',
    size: 'medium',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/d58121e2-68dc-448e-81af-53840485b40a.jpg',
    description: 'Премиальный домик из натурального дерева'
  },
  {
    id: 2,
    name: 'Игрушка Nature',
    price: '3 200 ₽',
    category: 'toys',
    size: 'small',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/8ec55107-5a5b-4132-8354-fe3479540100.jpg',
    description: 'Натуральная деревянная игрушка'
  },
  {
    id: 3,
    name: 'Керамическая миска Luxe',
    price: '4 800 ₽',
    category: 'accessories',
    size: 'small',
    material: 'ceramic',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/e3708b99-d488-46d4-9959-9e13647672a9.jpg',
    description: 'Элегантная керамическая миска'
  },
  {
    id: 4,
    name: 'Премиум домик XL',
    price: '18 900 ₽',
    category: 'houses',
    size: 'large',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/d58121e2-68dc-448e-81af-53840485b40a.jpg',
    description: 'Просторный домик для крупных грызунов'
  },
  {
    id: 5,
    name: 'Набор игрушек',
    price: '5 600 ₽',
    category: 'toys',
    size: 'medium',
    material: 'wood',
    image: 'https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/8ec55107-5a5b-4132-8354-fe3479540100.jpg',
    description: 'Набор натуральных деревянных игрушек'
  },
  {
    id: 6,
    name: 'Керамический набор',
    price: '7 200 ₽',
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
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">RODENTIA</h1>
            <div className="hidden md:flex gap-8">
              {['home', 'catalog', 'about', 'gallery', 'blog', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О бренде'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Премиум-изделия для грызунов
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Элегантность в каждой<br />детали
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Создаём изделия высокого класса для самых взыскательных владельцев домашних грызунов
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="text-base">
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                О бренде
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Каталог</h2>
            <p className="text-lg text-muted-foreground">
              Тщательно отобранные изделия премиум-класса
            </p>
          </div>

          <div className="mb-12 space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Категория</p>
                <div className="flex gap-2">
                  {(['all', 'houses', 'toys', 'accessories'] as Category[]).map((cat) => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(cat)}
                    >
                      {cat === 'all' && 'Все'}
                      {cat === 'houses' && 'Домики'}
                      {cat === 'toys' && 'Игрушки'}
                      {cat === 'accessories' && 'Аксессуары'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Размер</p>
                <div className="flex gap-2">
                  {(['all', 'small', 'medium', 'large'] as Size[]).map((size) => (
                    <Button
                      key={size}
                      variant={sizeFilter === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSizeFilter(size)}
                    >
                      {size === 'all' && 'Все'}
                      {size === 'small' && 'S'}
                      {size === 'medium' && 'M'}
                      {size === 'large' && 'L'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Материал</p>
                <div className="flex gap-2">
                  {(['all', 'wood', 'ceramic', 'fabric'] as Material[]).map((mat) => (
                    <Button
                      key={mat}
                      variant={materialFilter === mat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMaterialFilter(mat)}
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
              <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <Badge variant="secondary">{product.price}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category === 'houses' && 'Домик'}
                      {product.category === 'toys' && 'Игрушка'}
                      {product.category === 'accessories' && 'Аксессуар'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.material === 'wood' && 'Дерево'}
                      {product.material === 'ceramic' && 'Керамика'}
                      {product.material === 'fabric' && 'Ткань'}
                    </Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">О бренде</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RODENTIA — это воплощение элегантности и заботы о ваших питомцах. Мы создаём премиальные изделия, 
                сочетающие высокую эстетику с функциональностью.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Каждый предмет изготовлен вручную из натуральных материалов, безопасных для грызунов. 
                Наша миссия — превратить уход за питомцами в эстетическое удовольствие.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Натуральные материалы</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-muted-foreground mt-1">Счастливых клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://cdn.poehali.dev/projects/836c3b4c-5478-400f-b3af-20f4fd2ece0a/files/d58121e2-68dc-448e-81af-53840485b40a.jpg"
                alt="О бренде"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Галерея</h2>
            <p className="text-lg text-muted-foreground">
              Изделия в интерьере и жизни
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Блог</h2>
            <p className="text-lg text-muted-foreground">
              Советы и истории о заботе о грызунах
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Как выбрать идеальный домик',
                date: '15 декабря 2024',
                excerpt: 'Руководство по выбору комфортного и безопасного жилища для вашего питомца.'
              },
              {
                title: 'Натуральные материалы: почему это важно',
                date: '10 декабря 2024',
                excerpt: 'Разбираемся, какие материалы безопасны для грызунов и как их распознать.'
              },
              {
                title: 'Создание премиум-интерьера',
                date: '5 декабря 2024',
                excerpt: 'Советы по созданию стильного и функционального пространства для питомца.'
              }
            ].map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Button variant="link" className="px-0">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Контакты</h2>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <div className="text-muted-foreground">info@rodentia.ru</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div className="text-muted-foreground">Москва, ул. Примерная, д. 1</div>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input placeholder="Введите ваше имя" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашем запросе" rows={4} />
                </div>
                <Button className="w-full">Отправить</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">RODENTIA</h3>
              <p className="text-sm text-muted-foreground">
                Премиум-изделия для грызунов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Домики</div>
                <div>Игрушки</div>
                <div>Аксессуары</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>О бренде</div>
                <div>Блог</div>
                <div>Контакты</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                  <Icon name="Instagram" size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                  <Icon name="Facebook" size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                  <Icon name="Twitter" size={18} />
                </div>
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
