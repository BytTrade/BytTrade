import React, {useState, useEffect} from 'react'
import './style.css'
import binance from '../../assets/tp/Binance_logo.svg'
import bybit from '../../assets/tp/Bybit.svg'
import okx from '../../assets/tp/OKX_Logo.svg'
import kucoin from '../../assets/tp/KUCOIN.svg'
import usdt from '../../assets/coins/tether-usdt-logo.svg'
import btc from '../../assets/coins/bitcoin-sv-1.svg'
import eth from '../../assets/coins/Ethereum_logo_2014.svg'

const TradingBots = () => {
    

    const [shoulderCounter, setShoulderCounter] = useState(0)
    const [stopLoss, setStopLoss] = useState(0)
    const [takeProfit, setTakeProfit] = useState(0)
    const [windowSize, setWindowSize] = useState(0)
    const [insuranceCoefficient, setInsuranceCoefficient] = useState(0)
    const [moneyValue, setMoneyValue] = useState(0)
    const [moneyRange, setMoneyRange] = useState(0)

    const [typeOfBot, setTypeOfBot] = useState('')
    const [exchange, setExchange] = useState('')
    const [coin, setCoin] = useState('')
    const [mode, setMode] = useState('')
    useEffect(() => {
        if (shoulderCounter < 0) {
            setShoulderCounter(0)
            
        } else if (shoulderCounter > 10) {
            setShoulderCounter(10)
        }
    }, [shoulderCounter])
    

    const sendData = () => {
        if (
            typeOfBot != '' &&
            exchange != '' &&
            coin != '' &&
            mode != ''
        ) {
            alert('Great')
            console.log({
                'Type of bot': typeOfBot,
                'Exchange': exchange,
                'Coin': coin,
                'Mode': mode,
                'Credit shoulder': shoulderCounter,
                'Stop Loss': stopLoss,
                'Take Profit': takeProfit,
                'Window Size': windowSize,
                'Insurance Coefficient': insuranceCoefficient,
                'Money Value': moneyValue,
                'Money Range': moneyRange,
            })
        } else {alert('Something went wrong'); console.log('No!')}
    }

  return (
    <div className="tradingbots">
        <header className="header">
            <div className="header__left">
                <h2 style={{marginBottom: '10px'}}>TradingBots</h2>
                <span><img/>Top strategies per</span>
                <select name="topstrategies" id="timeselect">
                    <option value="day">day</option>
                    <option value="week">week</option>
                    <option value="month">month</option>
                </select>
            </div>
            <div className="header__right">
                <h2 style={{marginBottom: '10px'}}>Just click</h2>
                <span style={{marginBottom: '10px'}}><img/>Smart guide</span><br/>
                <span style={{marginBottom: '10px'}}><img/>Templates</span>
            </div>
        </header>
        <div className="tb__main">
            <div className="typeofbot tb__main-block">
                <h3>Choose type of Bot</h3>
                <div className="btns__div">
                    <button className={`${typeOfBot == 'DCA' ? 'activebtn' : 'btn'}`} onClick={() => {setTypeOfBot('DCA')}}><span style={{color: 'blue'}}>DCA-bot</span></button>
                    <button className={`${typeOfBot == 'GRID' ? 'activebtn' : 'btn'}`} onClick={() => {setTypeOfBot('GRID')}}><span style={{color: 'green'}}>GRID-bot</span></button>
                </div>
                
            </div>
            <div className="exchange tb__main-block">
                <h3>Choose Exchange</h3>
                <div className="btns__div">
                    <button className={`${exchange == 'BINANCE' ? 'activebtn' : 'btn'}`} onClick={() => {setExchange('BINANCE')}}><img src={binance} height="40px" width='100px' alt="Binance" /></button>
                    <button className={`${exchange == 'OKX' ? 'activebtn' : 'btn'}`} onClick={() => {setExchange('OKX')}}><img src={okx} height="40px" width='100px' alt="OKX" /></button>
                    <button className={`${exchange == 'KUCOIN' ? 'activebtn' : 'btn'}`} onClick={() => {setExchange('KUCOIN')}}><img src={kucoin} height="40px" width='100px' alt="KUCOIN" /></button>
                    <button className={`${exchange == 'BYBIT' ? 'activebtn' : 'btn'}`} onClick={() => {setExchange('BYBIT')}}><img src={bybit} height="40px" width='100px' alt="ByBit" /></button>
                </div>
                
            </div>
            <div className="coin tb__main-block">
                <h3>Choose coin</h3>
                <div className="btns__div">
                    <button className={`${coin == 'BTC' ? 'activebtn' : 'btn'}`} onClick={() => {setCoin('BTC')}}><img src={btc} width="30px" height="30px"/><span>BTC Bitcoin</span></button>
                    <button className={`${coin == 'ETH' ? 'activebtn' : 'btn'}`} onClick={() => {setCoin('ETH')}}><img src={eth} width="30px" height="30px"/>ETH ethereum</button>
                    <button className={`${coin == 'USDT' ? 'activebtn' : 'btn'}`} onClick={() => {setCoin('USDT')}}><img src={usdt} width="30px" height="30px"/>USDT tether</button>
                </div>
                
            </div>
            <div className="mode tb__main-block">
                <h3>Choose mode</h3>
                <div className="btns__div">
                    <button className={`${mode == 'SPOT' ? 'activebtn' : 'btn'}`} onClick={() => {setMode('SPOT')}}><span style={{color: 'blue'}}>Spot</span></button>
                    <button className={`${mode == 'FUTURES' ? 'activebtn' : 'btn'}`} onClick={() => {setMode('FUTURES')}}><span style={{color: 'orange'}}>Futures</span></button>
                </div>
                <div className="shoulderdiv">
                    <button 
                    className='plusminusbtn' 
                    onClick={() => setShoulderCounter(shoulderCounter - 1)}>
                        -
                    </button>
                    <div style={{margin: '0 10px',backgroundColor: '#eee', borderRadius:'5px', width: '175px'}}>
                        credit shoulder<input 
                        style={{backgroundColor: '#eee'}} 
                        type='number' 
                        placeholder='0' 
                        id='creditshoulderinput' 
                        onChange={(text) => setShoulderCounter(Number(text.target.value))}  
                        value={shoulderCounter != 0 ? shoulderCounter : ''}/>x
                    </div>
                    <button 
                    className='plusminusbtn' 
                    onClick={() => setShoulderCounter(shoulderCounter + 1)}>
                        +
                    </button>
                </div>
                
            </div>
            <div className="stoploss__container tb__main-block">
                <h3>Choose Stop Loss</h3>
                <div className="stoploss">
                    <div className="stoploss_simple">
                        <h4>Simple Sl and TP</h4>
                        <div className="stoploss_simple-stoploss stoploss_simple-element">
                            <div className='stoploss__element-text' >
                                <span className='stoploss__element-text_left'>Stop Loss</span>
                                <span 
                                style={{backgroundColor: '#eee'}} 
                                className='stoploss-input'
                                >{moneyValue - moneyValue/100*stopLoss}</span>
                            </div> 
                            <div className='stoploss__element-percent' >
                                <input 
                                style={{backgroundColor: '#eee'}} 
                                type='number' 
                                placeholder='0' 
                                className='stoploss__percent-input'
                                value={stopLoss != 0 ? stopLoss : ''}
                                onChange={(text) => setStopLoss(Number(text.target.value))}  
                                />
                                <span style={{color: '#fff'}}>%</span>
                               
                            </div> 
                        </div>
                        
                        <div className="stoploss_simple-takeprofit stoploss_simple-element">
                            <div className='stoploss__element-text' >
                                <span className='stoploss__element-text_left'>Take Profit</span>
                                <span 
                                style={{backgroundColor: '#eee'}} 
                                className='stoploss-input'
                                >{moneyValue - moneyValue/100*takeProfit}</span>
                            </div>
                            <div className='stoploss__element-percent' >
                                <input 
                                style={{backgroundColor: '#eee'}} 
                                type='number' 
                                placeholder='0' 
                                className='stoploss__percent-input'
                                value={takeProfit != 0 ? takeProfit : ''}
                                onChange={(text) => setTakeProfit(Number(text.target.value))}  
                                />
                                <span style={{color: '#fff'}}>%</span>
                                
                            </div> 
                        </div>
                    </div>

                    <div className="stoploss_trailing">
                        <h4>Trailing Sl and TP</h4>
                        <div className="stoploss_simple-windowsize stoploss_simple-element">
                            <div className='stoploss__element-text' >
                                <span className='stoploss__element-text_left'>Window Size</span>
                                <span 
                                style={{backgroundColor: '#eee'}} 
                                className='stoploss-input'
                                >{moneyValue - moneyValue/100*windowSize}</span>
                            </div>
                            <div className='stoploss__element-percent' >
                                <input 
                                style={{backgroundColor: '#eee'}} 
                                type='number' 
                                placeholder='0' 
                                className='stoploss__percent-input'
                                value={windowSize != 0 ? windowSize : ''}
                                onChange={(text) => setWindowSize(Number(text.target.value))}   
                                />
                                <span style={{color: '#fff'}}>%</span>
                                
                            </div> 
                        </div>
                        
                        <div className="stoploss_simple-insurancecoefficient stoploss_simple-element">
                            <div className='stoploss__element-text'>
                                <span className='stoploss__element-text_left' style={{fontSize: '0.75rem', width: '100px'}}>Insurance Coefficient</span>
                                <span 
                                style={{backgroundColor: '#eee'}} 
                                className='stoploss-input'
                                >{moneyValue - moneyValue/100*insuranceCoefficient}</span>
                            </div>
                            <div className='stoploss__element-percent'>
                                <input 
                                style={{backgroundColor: '#eee'}} 
                                type='number' 
                                placeholder='0' 
                                className='stoploss__percent-input'
                                value={insuranceCoefficient != 0 ? insuranceCoefficient : ''}
                                onChange={(text) => setInsuranceCoefficient(Number(text.target.value))}  
                                />
                                <span style={{color: '#fff'}}>%</span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="valuepair tb__main-block">
                <h3>Choose value pair</h3>
                <div className="valuetype">
                    <span>BTC</span>
                    <select></select>
                </div>
                <input type="number" className='stoploss__element-text' placeholder='Investment, USDT' onChange={(text) => setMoneyValue(Number(text.target.value))}  value={moneyValue} style={{border: 'none', padding: '10px', width: '280px'}}/><br/>
                <input type="range" min="0" max="1000" step="1" onChange={(text) => setMoneyValue(Number(text.target.value))}  value={moneyValue}/> <br/>
                <button className="savebtn" onClick={sendData}>Save bot configuration</button>
            </div>
        </div>
    </div>
    
  )
}

export default TradingBots