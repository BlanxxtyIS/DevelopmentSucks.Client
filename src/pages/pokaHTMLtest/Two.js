import './style.css'

export default function Two() {
    return (
        <div>
            <p>HAPPY HACKING!</p>
            <h1>Урок второй</h1>
            <ol>
                <li>Упорядоченные списки вот через ol</li>
                <li>а внутри также ли</li>
                <li>Если помнишь неупорядоченные списки через ul</li>
            </ol>

            <p>Сейчас уж изучаем <em>Курсив - он через em</em></p>
            <p>Жирные же через <strong>Строн - Strong</strong></p>

            <p>Бр-бр как холодно! переноси зиму <br /> через бр переносим</p>
            <p>давай заскучали хряк <hr /> черех хр линию чертим</p>
            <br />
            <p>перечитать первую страницу <a href='One'>го перечитаем</a></p>
            <h3>Разновиднеости ссылок</h3>
            <ol>
                <li><a href='https://internetingishard.netlify.app/html-and-css/links-and-images/'>Абсолютные ссылки </a></li>
                <li><a href='admin'>Относительные ссылки</a></li>
            </ol>

            <img src="/images/conspect.png" width={600} height={800} alt="коспектик"></img>
            <p>GIF <img src='/images/gifka.gif' width={350} height={350} alt="красивая гифка"/></p>
        </div>
    )
}