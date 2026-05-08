import type { SiteContent } from '@/types/site-content';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  navigation: {
    items: [
      { label: 'Çözümler', href: '/#expertise' },
      { label: 'Hizmetler', href: '/#expertise' },
      { label: 'Projeler', href: '/projects' },
      { label: 'Firma', href: '/#about' },
      { label: 'Kariyer', href: '/#contact' }
    ],
    ctaLabel: 'İletişime Geçin'
  },
  hero: {
    headline: 'Kodun Her Satırında Hassasiyet',
    description:
      'Modern işletmeler için yapılandırılmış, ölçeklenebilir ve yüksek güvenilirliğe sahip yazılım çözümleri geliştiriyoruz. Uzun vadeli kararlılık ve performans için tasarlanmış disiplinli mühendisliğin gücünü sunuyoruz.',
    primaryCtaLabel: 'Ücretsiz Danışmanlık Alın',
    secondaryCtaLabel: 'Çözümleri İnceleyin',
    imageSrc: '/images/logo-aka.png',
    imageAlt: 'AKA Yazılım'
  },
  expertise: {
    sectionTitle: 'Uzmanlık Alanlarımız',
    sectionDescription: 'Kurumsal düzeyde güvenilirliğe odaklanan yapılandırılmış mühendislik alanları.',
    items: [
      {
        title: 'Yazılım Geliştirme',
        description:
          'Güçlü mimarilerle özel uygulama geliştirme. Yüksek performans ve sıkı güvenlik standartlarına göre optimize edilmiş temiz ve sürdürülebilir kod teslim ediyoruz.',
        icon: 'code'
      },
      {
        title: 'Dijital Dönüşüm',
        description:
          'Eski altyapıların sistematik modernizasyonu. Parçalı veri silolarını operasyonel verimlilik için tasarlanmış bütünleşik ve otomatik iş akışlarına dönüştürüyoruz.',
        icon: 'network'
      },
      {
        title: 'Bulut Çözümleri',
        description:
          'Ölçeklenebilir bulut mimarisi kurulum ve yönetimi. Dayanıklı, dağıtık sistemler ve gelişmiş container orkestrasyonu ile %99,99 çalışma süresi sağlıyoruz.',
        icon: 'cloud'
      }
    ]
  },
  about: {
    title: 'Kararlılık için tasarlandı. Ölçek için kuruldu.',
    description:
      'AKA Yazılım olarak yazılım mühendisliğini hassasiyet gerektiren bir disiplin olarak görüyoruz. Yaklaşımımız kısa yolları reddeder; sıkı test, net mimari standartlar ve şeffaf süreçlerle çalışır. On yıllar sürecek büyümeyi destekleyecek kadar güçlü teknoloji temellerine ihtiyaç duyan kurumlarla birlikte çalışıyoruz.',
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBknCvtTeFs5Z553X-87f3Hc27mtMnHR-1r-9vAGk_WTq60anuL3JJ5U4T4alYMpdKGyEbGO3ATF-Vbgh1GT-UMbIMVdl--JGqetvjMrHqq5BklWFS_0j7VwMIpkbJPhvelJ_osX6NBqrlB9th_5qU_eSAhh3Hl-Amqf3v77D3ff9veWn_ohT_9wsRu_-DZHS-0e5XmHc0wKBemBcUKgbgqkjjtn6UI83v_4qFynpTJjWQosc-11q31abdA8WBWdeFNyYL_Q343avY',
    imageAlt: 'Sunucu odası',
    stats: [
      { value: '99.9%', label: 'Çalışma Süresi Garantisi' },
      { value: 'ISO', label: '27001 Sertifikalı' }
    ]
  },
  insights: {
    sectionTitle: 'Güncel İçgörüler',
    ctaLabel: 'Tüm İçerikleri Gör',
    featuredLabel: 'Beyaz Kitap • Teknik Mimari',
    featuredTitle: 'Mikroservisler ve Monolit: 2024 Kurumsal Dağıtım Modelleri Üzerine Veriye Dayalı Bir Analiz',
    featuredDescription: 'Büyük ölçekli sistemlerde yapısal bütünlüğü, dağıtım hızını ve operasyonel yükü değerlendiriyoruz.',
    blogLabel: 'Mühendislik Blogu',
    blogTitle: 'Sıfır Güven İlkesi ile Güvenlik Protokollerinin Uygulanması',
    blogDate: '12 Ekim 2023',
    reportTitle: '3. Çeyrek Performans Raporu',
    reportCtaLabel: 'PDF İndir',
    caseStudyLabel: 'Vaka Çalışması',
    caseStudyTitle: 'Lojistik Otomasyonu'
  },
  contact: {
    eyebrow: 'İletişim',
    title: 'Proje hedeflerinizi bize anlatın',
    description: 'İhtiyaçlarınızı paylaşın, ekibimiz işletmeniz için net bir teknik yol haritası hazırlasın.',
    successMessage: 'Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.',
    submitLabel: 'Talebi Gönder',
    sendingLabel: 'Gönderiliyor...',
    nameLabel: 'Ad Soyad',
    emailLabel: 'E-posta',
    companyLabel: 'Firma',
    phoneLabel: 'Telefon',
    messageLabel: 'Proje Detayları',
    namePlaceholder: 'Ahmet Yılmaz',
    emailPlaceholder: 'ornek@firma.com',
    companyPlaceholder: 'AKA Yazılım',
    phonePlaceholder: '+90 5XX XXX XX XX',
    messagePlaceholder: 'İş ihtiyaçlarınızı, istediğiniz zaman planını ve beklenen çıktıları kısaca anlatın.'
  },
  projects: {
    intro: {
      title: 'Mühendislikte Hassasiyet',
      description:
        'Kurumsal ortamlar için geliştirilmiş, yapılandırılmış, ölçeklenebilir ve güvenli yazılım çözümlerinin bir vitrini. Projelerimiz mutlak güvenilirliği ve teknik mükemmeliyeti yansıtır.',
      allLabel: 'Tüm Projeler',
      webLabel: 'Web',
      mobileLabel: 'Mobil',
      enterpriseLabel: 'Kurumsal'
    },
    projects: [
      {
        sector: 'Kurumsal Veri Platformu',
        title: 'Proje Alfa',
        description:
          'Gerçek zamanlı finansal analiz için geliştirilmiş, veri kaybı olmadan çalışan ve alt saniye gecikme sağlayan yüksek ölçeklenebilir bir veri alma ve işleme hattı.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOjbZ9uNLKRSh0nTvz103GWzHDUcaNnmuh51wxAHNdpkSu0Mtygkdn0FBMjSMVanjlBreql6f3AzUuec-rD63A9DJ5Gi4-uEoeKryJ8MYnXrjKWXc6bzB530d2jjgJToyG6VlLOfYF6ONbqD0SwMbjz1woJzcf7kePrkuNxU7nVnQO2UD_VlFA8-iA6ouT6LtZ-_M_3yurqTlidP3J93wVNsMAGD3aWM-xbv_IeJXtihus_IcV8yojTJWcPC1skK-RJuMhKOQrvM'
      },
      {
        sector: 'Mobil Lojistik Uygulaması',
        title: 'Rota Optimizasyonu Beta',
        description:
          'Saha ekiplerinin teslimat rotalarını karmaşık arka uç algoritmalarıyla optimize etmesi için tasarlanmış güçlü bir yerel uygulama. Geçiş süresini %22 azaltır.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJnNm5TIKZh_5tB-n_xfqFceQCPrUj7N2Y1aMcoS1vl_zXqnvYDmzzY5DBjbYT1Vu5E2rV2Sto1vAckR1OAVuWShG_HDjYE45DIgEB5jO_Gqs7orak5RTSyvyEMwLsZt-L97lwEuYystPgeXbkfmKsQXSsGCI5gMW7lyCaYxuvcsxBO-dijm0NoZmVowVxAnju3RCnKnIP_kjWwh_aQhtT8qsfOzq40cAXxTFtBXMFiDhgpid3OFpF3fWhjjuer1Z0B7cFMS1yl7w'
      },
      {
        sector: 'Güvenli B2B Web Portalı',
        title: 'Geçit Gama',
        description:
          'Rol tabanlı erişim kontrolü, şifreli doküman saklama ve uyumluluk için otomatik denetim kaydı sunan kapsamlı bir müşteri yönetim portalı.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBwLrKSE407mtOmXG0UZR5MDIjMrWmoOczJPPAdNx4K3EK_O825r4vn0013aXfetA2P2ZgLSzwG1t6dImI2u2-yYClbE-0YlgwPZ18gX2AtTaY3cogd9QKo1fWm67py27PB-dALG3q0DhGtVLhhIi-IY-tboWTv1qOoXGMjiUjfYfUrBZOCbAKe0hYSdIo7VltddANalUoJkDCiOy4xOROOrAcuQgf6AC71yxUXB1EReNyQAOoVjwErWJsGOunZi6r6Kk4aMvkLKc4'
      },
      {
        sector: 'Kurumsal Kaynak Planlama',
        title: 'Sistem Delta Entegrasyonu',
        description:
          'Eski sistemlerin birleşik bir ERP çatısı altında sorunsuz entegrasyonu. 15 küresel departmanda iç iş akışlarını standartlaştırır.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnxG4TITOh8V0oUxTgoBejMHAzGYuYF-Eu5Y_kmzWP8KwGyOKE_5oFnKDle60_A5dCJu-eil-cQaAARZVPlZHFlDRU544X52cc_sIy7Dg_Ta0KFcU3wuFUkLtwMvO4PhtksZSXCLNKHEgmmVPyzpTovNdBxojlfmrSHzLGj2zNQApIACR0SGxV-ch5oJ8wCY_qJLq1n8KsDgSZHfzzLdHn2-AbymM0ZJRDYOLsvfZy_ldJBAoMIO1VzlVnb-cMsMVOXfukegJfxI'
      },
      {
        sector: 'Bulut Altyapısı',
        title: 'Epsilon Göçü',
        description:
          'Yerel sunucuların yüksek erişilebilirlikli, çok bölgeli bir bulut mimarisine tam kapsamlı taşınması. %99,999 çalışma süresi sağlar.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB6TJP47dy0dhKmgsNkf7keLhw2rQN32yqikde-qT3zSbDZUSoGujdbeLad72CDvehXgN1h-9NQRWYYhTRJWrKW3zvCaNXD1jQO7IxecsNbMei4O2nAUGCR7ebYseglqiQx-mLAaDzfnTY9oZYEnrp0d81irvBMIDehcRUvser_sK2PYPvGxNdZGgl1Twgw97Cu-SlRIfcoWMZGFzBVVju__4lpClfmGaDXYP__-T_3pCQkA7iWZP-yf4pWhIUdj35tdRXQniT55nA'
      },
      {
        sector: 'Kurumsal Güvenlik Paketi',
        title: 'Zeta Tehdit Koruması',
        description:
          'Anormal ağ davranışlarını tespit edip etkisiz hale getirmek için makine öğrenimi modelleri kullanan gelişmiş bir tehdit tespit sistemi.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWuQawaLqTpfsRLX4lpuE596XTxFyCSM-En1se-Z0rTkKHEhuVTd-UzoPH6b4g43mibdUrDPvscPAqtWic4Lpe4dwKozrRa8lTly8AFd9UAYx8KNnG-oHu6AHMmsR5VgfroeO14w1c4ECDSUn0cRE5BAzUnWyat3Y7ZCVK2mHwbAwmIeaBv-tpPf4EnQdZ6QiUddIhBBaZZTQ0ieMSQAAHL_m_x6EwCyuLw-qNpMeiKc0lYfZp5MqQoC-mHBLdLkfFyn2tucVX6w'
      }
    ],
    successTitle: 'Başarı Hikayeleri',
    successSector: 'Küresel Bankacılık Sektörü',
    successHeadline: 'Temel Bankacılık Sistemlerini Dönüştürmek',
    successDescription:
      "Avrupa'nın önde gelen bir bankası için eski işlem motorunu tamamen yeniledik. Geçiş sırasında tam uyumluluğu ve sıfır kesintiyi korurken işlem hacmini %400 artırdık.",
    successButtonLabel: 'Vaka Çalışmasını Oku',
    successImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdw-sL7uxobwlGT69LGBqszh9IRVNLmkADUAgt8BYcZTsvTKX6WyJAvduOLDd5JOkbHDPUxJ-t4EfrQYq5p0nN2afEUJ5LgPdrNqoaJOeLtRnRQJ2VdSW8Xludwqj4aGeXx6hL44pu5r_3jqYpEiO27HcUW2D8YrDx36meKK2BSQcuG8icQBYrTgauqUkSbNKTJ-JebY52qIMC9aawCjeljJBPA6Ws_WmqgZ9aiY3nrOzew0aXj4a8te2_-sz--ebxPwE71IZ-OSo',
    stats: [
      { value: '99.999%', label: 'Son 5 yılda elde edilen çalışma süresi' },
      { value: 'Zero', label: 'Güvenlik mimarilerinde veri ihlali' }
    ]
  },
  footer: {
    description: 'Yazılım mühendisliğinde hassasiyet. Kurumsal teknoloji için sağlam temeller kuruyoruz.',
    copyright: '© 2026 AKA Yazılım. Tüm hakları saklıdır.',
    legalTitle: 'Yasal',
    legalLinks: [
      { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
      { label: 'Hizmet Şartları', href: '#' },
      { label: 'Çerez Politikası', href: '#' }
    ],
    navigationTitle: 'Navigasyon',
    navigationLinks: [
      { label: 'Site Haritası', href: '#' },
      { label: 'Güvenlik', href: '#' }
    ],
    officeTitle: 'Ofis',
    officeLines: ['İstanbul Teknik Üniversitesi', 'Teknokent, ARI 3 Binası', 'Maslak, İstanbul, Türkiye']
  }
};
