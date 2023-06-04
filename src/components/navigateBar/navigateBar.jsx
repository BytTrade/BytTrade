import React from 'react'
import './style.css'
import mountain from '../../assets/navbar/Vector 1.svg'
import rightArrow from '../../assets/navbar/white-arrow-icon-png-28.jpg'

const NavigateBar = () => {
  return (
    <div className='navigatebar'>
        <div className="sticky">
            <header className='navbar__header'>
                <img src={mountain} width='30px' height='20px'/><span>BYTrade</span>
            </header>
            <div className="navigatebar__container">
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    AI trading<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="/tradingbots" className="navlink"><div className="navigaatebar__container-element">
                    Trading bots<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="/rules" className="navlink"><div className="navigaatebar__container-element">
                    Rules<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    Settings<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    Exchanges<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    Data Studio<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    Get a plan<img height='20px' src={rightArrow}/>
                </div></a>
                <a href="#" className="navlink"><div className="navigaatebar__container-element">
                    Help Center<img height='20px' src={rightArrow}/>
                </div></a>
            </div>
        </div>
    </div>
  )
}

export default NavigateBar