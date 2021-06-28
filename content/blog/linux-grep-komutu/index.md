---
title: "Linux grep komutu?"
date: "2021-06-19"
coverImage: "./cover.jpg"
category: ["Linux"]
---

Grep, temel bir Linux ve Unix komutudur. Belirli bir dosyadaki metin ve dizeleri aramak için kullanılır. Başka bir deyişle, grep komutu, verilen dosyada, verilen dizeler veya kelimelerle eşleşme içeren satırları arar. Geliştiriciler ve sistem yöneticileri için Linux ve Unix benzeri sistemlerde en kullanışlı komutlardan biridir. Linux veya Unix benzeri bir sistemde grep'in nasıl kullanılacağını görelim.

### Belirli bir dosyada arama yapmak

```bash
grep "Aranacak kelime" dosya_adi.txt
```

### Belirli bir dizindeki tüm dosyalarda arama yapmak

```bash
grep -rns "Aranacak kelime" /dizin
```

### Alabildiği bazı parametreler

- -c aranan kelimenin dosya içerisinde kaç kez kullanıldığı listelenecektir.
- -h Eşleşen satırları görüntüler, ancak dosya adlarını görüntülemez.
- -i küçük/büyük harf ayırt etmeksizin metinler listelenecektir.
- -l Yalnızca dosya adlarının listesini görüntüler.
- -n bulunan kelimenin hangi satırda olduğunu belirtecektir.
- -r dizin içinde arama yapabilmeze izin verilmesini sağlar.
- -s arama işlemi sırasında çıkan hataları ekrana çıktı vermesini engelleyecektir.
- -v belirli kelime dışında kalan metinler listelenecektir.
