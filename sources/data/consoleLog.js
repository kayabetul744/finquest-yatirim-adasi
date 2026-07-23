import * as THREE from 'three/webgpu'

const text = `
██╗   ██╗ █████╗ ████████╗██╗██████╗ ██╗███╗   ███╗
╚██╗ ██╔╝██╔══██╗╚══██╔══╝██║██╔══██╗██║████╗ ████║
 ╚████╔╝ ███████║   ██║   ██║██████╔╝██║██╔████╔██║
  ╚██╔╝  ██╔══██║   ██║   ██║██╔══██╗██║██║╚██╔╝██║
   ██║   ██║  ██║   ██║   ██║██║  ██║██║██║ ╚═╝ ██║
   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝

 █████╗ ██████╗  █████╗ ███████╗██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██║
███████║██║  ██║███████║███████╗██║
██╔══██║██║  ██║██╔══██║╚════██║██║
██║  ██║██████╔╝██║  ██║███████║██║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝

╔═ Giriş ════════════════╗
║ Portfolyomuzu ziyaret ettiğin için teşekkürler, seni meraklı geliştirici!
║ Bu projenin altyapısını ve nasıl inşa edildiğini merak ediyorsan, bilmen gereken her şey burada.
╚═══════════════════════╝

╔═ Hata Ayıklama ════════╗
║ URL'nin sonuna #debug ekleyip sayfayı yenileyerek hata ayıklama moduna erişebilirsin.
║ Serbest kamerayı açıp kapatmak için [V] tuşuna bas.
╚═══════════════════════╝

╔═ Three.js ═════════════╗
║ Three.js, bu 3D dünyayı render etmek için kullandığımız kütüphane (sürüm: ${THREE.REVISION})
║ https://threejs.org/
║ mr.doob (https://x.com/mrdoob, https://github.com/mrdoob) tarafından oluşturuldu,
║ ardından yüzlerce harika geliştirici katkı sundu; bunlardan biri olan Sunag
║ (https://x.com/sea3dformat, https://github.com/sunag) gelişmiş render tekniklerinin
║ kullanımını mümkün kılan TSL'yi ekledi ve bu portfolyoyu mümkün kıldı.
╚═══════════════════════╝

╔═ Three.js Journey ═════╗
║ Three.js öğrenmek istersen, bu kapsamlı kurs seni her konuda destekler.
║ https://threejs-journey.com/
║ Three.js ile (ve daha fazlasıyla) harika şeyler inşa etmeye başlaman için ihtiyacın olan her şeyi içeriyor.
╚═══════════════════════╝

╔═ Kaynak kod ═══════════╗
║ Bu proje, MIT lisansı altında paylaşılan açık kaynaklı bir şablon (folio-2025) temel alınarak geliştirildi.
║ https://github.com/brunosimon/folio-2025
║ Sunucu tarafı kodu güvenlik nedeniyle paylaşılmıyor, ancak portfolyo onsuz da çalışıyor.
╚═══════════════════════╝

╔═ Müzikler ═════════════╗
║ Duyduğun müzikler, orijinal folio-2025 projesi için özel olarak Kounine (Linktree) tarafından yapıldı.
║ https://linktr.ee/Kounine
║ Artık CC0 lisansı altındalar, yani onlarla istediğini yapabilirsin!
║ Buradan indirebilirsin.
║ https://github.com/brunosimon/folio-2025/tree/main/static/sounds/musics
╚═══════════════════════╝

╔═ Birkaç bağlantı daha ═╗
║ Rapier (Fizik kütüphanesi)  ⇒ https://rapier.rs/
║ Howler.js (Ses kütüphanesi) ⇒ https://howlerjs.com/
║ Amatic SC (Yazı tipi)       ⇒ https://fonts.google.com/specimen/Amatic+SC
║ Nunito (Yazı tipi)          ⇒ https://fonts.google.com/specimen/Nunito?query=Nunito
╚═══════════════════════╝
`
let finalText = ''
let finalStyles = []
const stylesSet = {
    letter: 'color: #ffffff; font: 400 1em monospace;',
    pipe: 'color: #D66FFF; font: 400 1em monospace;',
}
let currentStyle = null
for(let i = 0; i < text.length; i++)
{
    const char = text[i]

    const style = char.match(/[╔║═╗╚╝╔╝]/) ? 'pipe' : 'letter'
    if(style !== currentStyle)
    {
        currentStyle = style
        finalText += '%c'

        finalStyles.push(stylesSet[currentStyle])
    }
    finalText += char
}

export default [finalText, ...finalStyles]
