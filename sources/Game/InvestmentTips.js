import { Game } from './Game.js'

export class InvestmentTips
{
    constructor()
    {
        this.game = Game.getInstance()

        this.element = this.game.domElement.querySelector('.js-investment-tip')
        this.visibleDuration = 6
        this.minDelay = 10
        this.maxDelay = 15
        this.lastIndex = -1

        this.tips = [
            'Bileşik faiz katlanarak büyür — küçük birikimler zamanla dev bir servete dönüşebilir.',
            'Tek bir yatırım aracına güvenme: hisse, döviz, altın ve fonları dengeli dağıt.',
            'Önce acil durum fonunu oluştur — 3-6 aylık giderini karşılayacak kadar nakit ayır.',
            'Piyasa zamanlamasını tahmin etmeye çalışmak yerine, düzenli aralıklarla yatırım yap.',
            'Kısa sürede yüksek getiri vaat eden tekliflere karşı hep şüpheci ol.',
            'Erken başlamak, geç başlayana göre çok daha az sermayeyle çok daha fazla birikim sağlar.',
            'Araba gibi hızlı değer kaybeden varlıklar yerine, zamanla değer kazanan varlıklara odaklan.',
            'Yüksek faizli borcunu kapatmak da aslında garantili bir yatırım getirisidir.',
            'Duygularınla değil planınla yatırım yap — panik satışı çoğu zaman en büyük kayıptır.',
            'Anlamadığın bir yatırıma asla girme; önce araştır, sonra karar ver.',
            'Enflasyon paranın değerini eritir — nakit biriktirmek de aslında bir risktir.',
            'Getiri kadar riski de ölç: genelde yüksek getiri, yüksek risk demektir.',
            'Tatil bütçeni erken planlamak ve döviz kurunu takip etmek ciddi tasarruf sağlar.',
            'Portföyünü yılda en az bir kez gözden geçir ve yeniden dengele.',
            'Araba alırken sıfır yerine az kullanılmış tercih etmek, en hızlı değer kaybı dönemini atlatır.',
        ]

        this.state = 'waiting'
        this.timer = this.getRandomDelay()

        this.game.ticker.events.on('tick', () =>
        {
            this.update()
        })
    }

    getRandomDelay()
    {
        return this.minDelay + Math.random() * (this.maxDelay - this.minDelay)
    }

    update()
    {
        this.timer -= this.game.ticker.delta

        if(this.timer > 0)
            return

        if(this.state === 'waiting')
        {
            if(this.show())
            {
                this.state = 'visible'
                this.timer = this.visibleDuration
            }
            else
            {
                // Not in free-driving mode yet, try again after a fresh delay
                this.timer = this.getRandomDelay()
            }
        }
        else
        {
            this.hide()
            this.state = 'waiting'
            this.timer = this.getRandomDelay()
        }
    }

    show()
    {
        // Only pop up during free wandering (not intro, menu, modals or racing)
        if(!document.documentElement.classList.contains('input-filter-wandering'))
            return false

        let index = Math.floor(Math.random() * this.tips.length)
        if(this.tips.length > 1)
        {
            while(index === this.lastIndex)
                index = Math.floor(Math.random() * this.tips.length)
        }
        this.lastIndex = index

        this.element.innerHTML = /* html */`<span class="label">💡 Yatırım İpucu</span>${this.tips[index]}`
        this.element.classList.add('is-visible')

        return true
    }

    hide()
    {
        this.element.classList.remove('is-visible')
    }
}
