import React, {useState, useEffect} from 'react'
import { useForm, Controller } from "react-hook-form"
import './style.css'
import binance from '../../assets/tp/Binance_logo.svg'
import bybit from '../../assets/tp/Bybit.svg'
import okx from '../../assets/tp/OKX_Logo.svg'
import kucoin from '../../assets/tp/KUCOIN.svg'
import usdt from '../../assets/coins/tether-usdt-logo.svg'
import btc from '../../assets/coins/bitcoin-sv-1.svg'
import eth from '../../assets/coins/Ethereum_logo_2014.svg'
import axios from 'axios'
// import { OperatorRule, ActionRule, IfRule } from './RuleBlocks'

const Rules = () => {

// Variables\states
    const today = new Date()
    const [startDate, setStartDate] = useState(today.toLocaleString())
    // const [title, setTitle] = React.useState("");
    const [checkSchedule, setCheckSchedule] = useState(true);
    const [checkAnotherRule, setCheckAnotherRule] = useState(false)
    const [executeMinutes, setExecuteMinutes] = useState(0)
    const [shoulderCounter, setShoulderCounter] = useState(0)
    const [toggleRuleBtn, setToggleRuleBtn] = useState(false)
    const [coin1, setCoin1] = useState('')
    const [coin2, setCoin2] = useState('')
    const [ifRule, setIfRule] = useState(0)
    const [actionRule, setActionRule] = useState(0)
    const [operatorRule, setOperatorRule] = useState(0)
    const [trackingTypeCoinPair, setTrackingTypeCoinPair] = useState('')
    const [btnClick, setBtnClick] = useState(0)
    const [ruleModules, setRuleModules] = useState([])

    const { register, handleSubmit, getValues, setValue, control, watch, reset, unregister } = useForm();
    const timeframes = ['1m', '5m', '10m', '30m','1h', '2h']
    const coins = ["BTC", "ETH", "USDT"]
    const compare_types = [
        "adx (14)",
        "bb (20)",
        "bb (2)",
        "bb (0)",
        "dema (20)",
        "ema (9)",
        "lom (10)",
        "ma (9)"
    ]
    // [
    //     {"adx": 14,},
    //     {"bb": 20,},
    //     {"bb": 2,},
    //     {"bb": 2,},
    //     {"bb": 0,},
    //     {"dema": 20,},
    //     {"ema": 9,},
    //     {"lom": 10,},
    //     {"ma": 9,},
    // ]
    // const moneyOrPercent = 'aboba'

    const tomorrowDay = today.getUTCDate() + 1
    const month = today.getUTCMonth()
    const year = today.getUTCFullYear()

    const MyDateString = 
            year  + '-'
             + ('0' + (month+1)).slice(-2) + '-'
             + ('0' + tomorrowDay).slice(-2)
             + 'T00:00'
            
// Effects
    useEffect(() => {
        if (shoulderCounter < 0) {
            setShoulderCounter(0)
            
        } else if (shoulderCounter > 10) {
            setShoulderCounter(10)
        }
    }, [shoulderCounter])

    useEffect(() => {
        if (executeMinutes < 0) {
            setExecuteMinutes(0)
            
        }
    }, [executeMinutes])

    useEffect(() => {
        if (startDate < today) { setStartDate(today.toLocaleString()) }
    }, [startDate])

    useEffect(() => {
        const indexOne = coin1[0]
        const indexTwo = coin2[0]
        // console.log(indexOne, indexTwo)
        // писать isNaN для проверки
        // !!indexOne Определяет что не NaN, undefined, ''
        // +variable переводит число в строку
        if (coin1 !== '' && coin1 !== NaN && coin1 !== undefined 
        && coin2 !== '' && coin2 !== NaN && coin2 !== undefined)
        if (indexOne === indexTwo && indexOne !== NaN && indexTwo !== NaN) {
            const coin = coin1.substring(1,4)+coin2.substring(1,4)
            console.log(coin)
            setValue(`conditions.${Number(indexOne)}.coin.name`, coin)
        } 
        
    },[coin1, coin2])

    // const mode = watch('mode')



    const convertToUnixtime = datetime => {
        const unixTime = Math.floor(new Date(datetime).getTime() / 1000)
        return unixTime.toString().substring(0, 10)
    }


// Save data on Save Rule btn

    const onSubmit = async (data) => {
        
            // console.log(data)
            const immediately = data.scheduled_start_time
            const checkControl = () => {
                let controlled_launch = false
            if (immediately === NaN) {
                controlled_launch = false
                return controlled_launch
            } else {
                controlled_launch = false
                return controlled_launch
            }
            }   

            let scheduled_time = Number(convertToUnixtime(data.scheduled_start_time))
            const schedule = () => {
                
            if (scheduled_time > Number(convertToUnixtime(today)) ) {
                return scheduled_time
            } else {
                
                scheduled_time = Number(convertToUnixtime(today))
                return scheduled_time
            }
            }

            const retry = () => {
                const val = Number(data.retry_succesful)
                if (val > 1 ) {
                    return val
                } else {
                    return 1
                }
            }
            
            // Take and serialize all Data
            const axiosData ={
                'rule_name': data.titleChange,
                'rules': {
                    "conditions": data.conditions,
                    "actions": data.actions,
                    // "operators": data.operators,
                    "operators": [
                        {
                            "run_on_success": false,
                            "name": "controlled_launch",
                            "params": "rule_id=c32831196502ab7aceb942cb14bd8b57"
                        }
                    ]
                  },
                "trade_platform_id": 1234,
                "planning": {
                    "controlled_launch": checkControl(),
                    "scheduled_start_time": schedule(),
                    "rule_work_timeout": Number(data.rule_work_timeout),
                    "retry_successful_attempts": retry(),
                },
                "active_rule": !checkSchedule,
            }

            // Send Data to server
            if (
                !!data.conditions  &&
                !!data.actions &&
                btnClick === 1
            ) {
                axios.post('https://109.106.136.152:443/user/task/create', axiosData)
                .then((data) => {
                    console.log(data)
                    alert('Your Rule is saved!')
                    setBtnClick(0)
                })
                .catch((err) => {
                    console.log(err)
                    alert('Something went wrong')
                })
            }
            // console.log(axiosData)
    };
    
    
    
// delete ruleBlock func
    const deleteRuleModule = (module) => {
        setRuleModules( currentModules => {
            return currentModules.filter(ruleModule => ruleModule.props.delKey !== module)
        })
        // console.log(ruleModules.map(ruleModule => console.log(ruleModule.props.delKey)))
    }
// add ruleBlock func
    const addRuleBlock = (type) => {
        let Block = null
        {
            type == 'IF'
            ? Block = <IfRule delKey={ruleModules.length}/>
            : type == 'ACTION'
            ? Block = <ActionRule delKey={ruleModules.length}/>
            : type == 'OPERATOR'
            ? Block =<OperatorRule delKey={ruleModules.length}/>
            : Block =<SpecsRule />
        }
        setRuleModules(ruleModules.concat(
        Block
        ))
    }


// RuleBlocks
        const IfRule = (delKey) => {
            // console.log(watch('mode.0'))
            const [mode, setMode] = useState('Condition')
            const [condFunc, setCondFunc] = useState('ma (9)')
            const [condFunc2, setCondFunc2] = useState('ma (9)')
            useEffect(() => {
                if (mode === 'Condition') {
                    const condition_type = 'comparison'
                    setValue(`conditions.${delKey.delKey}.condition_type`, condition_type)
                } else if (mode === 'Tracking') {
                    const condition_type = 'tracking'
                    setValue(`conditions.${delKey.delKey}.condition_type`, condition_type)
                }
                
                // {mode === 'Condition' ? 'comparison' : mode === 'Tracking' ? 'tracking' : ''}
                
            }, [mode])

            useEffect(() => {
                let cond = condFunc
                let condF = condFunc.split(' ')[0]
                let condP = cond.split(' ')[1].replace('(','').replace(')','')
                setValue(`conditions.${delKey.delKey}.function`, condF)
                setValue(`conditions.${delKey.delKey}.params`, [`period=${condP}`])
            }, [condFunc])

            useEffect(() => {
                let cond = condFunc2
                let condF = condFunc.split(' ')[0]
                let condP = cond.split(' ')[1].replace('(','').replace(')','')
                setValue(`conditions.${delKey.delKey}.compare_function`, condF)
                setValue(`conditions.${delKey.delKey}.compare_params`, [`period=${condP}`])
            }, [condFunc2])

            // React.useEffect(() => {
            //     const subscription = watch((value) => setMode(value.mode));
            //     return () => subscription.unsubscribe();
            //   }, [watch]);

            const ConditionMode = () => {
                return (
                    <div className='IfRule-modeBlock'>
                                        <select 
                                        // {...field}
                                        // defaultValue={'1m'}
                                        onChange={(cond) => setCondFunc(cond.target.value)} 
                                        value ={condFunc}
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            {/* <option value=''>function 1</option> */}
                                        {compare_types.map((compare_type) => (
                                                <option value={compare_type} key={compare_type}>{compare_type}</option>
                                            ))}
                                        </select>
                                <Controller
                                    control={control}
                                    name={`conditions.${delKey.delKey}.comparison`}
                                    render={({ field }) => (
                                        <select 
                                        {...field}
                                        // defaultValue={'1m'}
                                        // onChange={(coin) => {setCoin2(coin2 => coin2.concat(coin.target.value))}} 
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            <option value=''>comparison</option>
                                            <option value='<'>less</option>
                                            <option value='>'>more</option>
                                            <option value='<='>less or equal</option>
                                            <option value='>='>more or equal</option>
                                            <option value='='>equal</option>
                                        </select>
                                    )}
                                />
                                        <select 
                                        // {...field}
                                        // defaultValue={'1m'}
                                        onChange={(cond) => setCondFunc2(cond.target.value)} 
                                        value ={condFunc2}
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            {/* <option value=''>function 2</option> */}
                                        {compare_types.map((compare_type) => (
                                                <option value={compare_type} key={compare_type}>{compare_type}</option>
                                            ))}
                                        </select>
                                <select 
                                        // {...field}
                                        onChange={(coin) => {
                                            let coinT = delKey.delKey + coin.target.value
                                            setCoin2(coinT)
                                            // changeCoinPair(delKey.delKey)
                                        }} 
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            <option value=''>coin</option>
                                        {coins.map((coin) => (
                                                <option value={coin} key={coin}>{coin}</option>
                                            ))}
                                        </select>
                                in a 
                                <Controller
                                    control={control}
                                    name={`conditions.${delKey.delKey}.coin.timeframe`}
                                    render={({ field }) => (
                                        <select 
                                        {...field}
                                        // defaultValue={'1m'}
                                        // onChange={(coin) => {setCoin2(coin2 => coin2.concat(coin.target.value))}} 
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            <option value=''>timeframe</option>
                                        {timeframes.map((timeframe) => (
                                                <option value={timeframe} key={timeframe}>{timeframe}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>
                )
            }

            const TrackingMode = () => {
                return (
                    <div className='IfRule-modeBlock'>
                                {/* <select {...register(`conditions.${delKey.delKey}.hasPrice`)} name="..." className='rulemodule__body-selectother rulemodule__body-item' style={{width: '50px'}}>
                                    <option value="price">price</option>
                                </select> */}
                                <select {...register(`conditions.${delKey.delKey}.tracking_type`)} 
                                onChange={select => setTrackingTypeCoinPair(select.target.value)} name="..." className='rulemodule__body-selectother rulemodule__body-item'>
                                    <option value="increased">increase by</option>
                                    <option value="decreased">decrease by</option>
                                    {/* <option value="greater">greater than</option>
                                    <option value="lower">lower than</option> */}
                                </select>
                                 <input  {...register(`conditions.${delKey.delKey}.compare_percent`, {
                                    setValueAs: v => Number.parseFloat(v),
                                })} type="float" style={{width: '40px', textAlign: 'center'}}/>
                                <div className='rulemodule__body-item'>%</div>
                                
                                        <select 
                                        // {...field}
                                        onChange={(coin) => {
                                            let coinT = delKey.delKey + coin.target.value
                                            setCoin2(coinT)
                                            // changeCoinPair(delKey.delKey)
                                        }} 
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            <option value=''>coin</option>
                                        {coins.map((coin) => (
                                                <option value={coin} key={coin}>{coin}</option>
                                            ))}
                                        </select>
                                        <div className='rulemodule__body-item'>in a</div>
                                        <Controller
                                    control={control}
                                    name={`conditions.${delKey.delKey}.coin.timeframe`}
                                    render={({ field }) => (
                                        <select 
                                        {...field}
                                        // defaultValue={'1m'}
                                        // onChange={(coin) => {setCoin2(coin2 => coin2.concat(coin.target.value))}} 
                                        name={delKey.delKey} 
                                        className='rulemodule__body-selectcoin rulemodule__body-item'>
                                            <option value=''>timeframe</option>
                                        {timeframes.map((timeframe) => (
                                                <option value={timeframe} key={timeframe}>{timeframe}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>
                )
            }
        
            return (
                <div key={delKey.delKey} className="rulemodule">
                    <header className='rulemodule__header' style={{}}>
                        <span style={{color: 'blue', width:'75px', borderBottom: '3px solid blue'}}>If</span>
                        <button className='rulemodule__header-delbtn' onClick={() => deleteRuleModule(delKey.delKey)}>+</button>
                    </header>
                    <div className="rulemodule__body" style={{boxShadow: '-2px 3px 5px 0px rgba(0, 98, 255, 1)', height: '75px', flexDirection: 'column', paddingTop: '10px', textAlign: 'left'}}>
                 
                        <div className='Ifrulemodule_body-item rulemodule_body-item'>
                            Mode: <input type="radio" id="modeChoice1"
                                    // name={`mode.mode${delKey.delKey}`} 
                                    // {...register(`mode.${delKey.delKey}`)}
                                    checked={mode === 'Condition' ? true : false} 
                                    value="Condition" 
                                    onClick={(type) => {
                                        
                                        setMode(type.target.value)

                                        unregister(`conditions.${delKey.delKey}.tracking_type`)
                                        unregister(`conditions.${delKey.delKey}.compare_percent`)
                                        setValue(`conditions.${delKey.delKey}.coin.name`, coin1.substring(1,4)+coin2.substring(1,4))
                                        
                                }}
                                    />
                                    <label htmlFor="contactChoice1">Condition</label>
                                    
                                    <input type="radio" id="modeChoice2"
                                    // {...register(`mode.${delKey.delKey}`)}
                                    // name={`mode.mode${delKey.delKey}`}
                                    checked={mode === 'Tracking' ? true : false} 
                                    value="Tracking" 
                                    onClick={(type) => {
                                        setMode(type.target.value)
                                        unregister(`conditions.${delKey.delKey}.function`)
                                        unregister(`conditions.${delKey.delKey}.compare_function`)
                                        unregister(`conditions.${delKey.delKey}.params`)
                                        unregister(`conditions.${delKey.delKey}.compare_params`)
                                        unregister(`conditions.${delKey.delKey}.comparison`)
                                        setValue(`conditions.${delKey.delKey}.coin.name`, coin1.substring(1,4)+coin2.substring(1,4))
                                }}
                                    />
                                    <label htmlFor="contactChoice2">Tracking</label>
                        </div>
                        <div className='Ifrulemodule_body-item rulemodule_body-item'>
                        
                        <select 
                                // {...register(`conditions.${delKey.delKey}.coin1`)} 
                                name={delKey.delKey} 
                                onChange={(c) => {
                                    let coin = delKey.delKey + c.target.value
                                    setCoin1(coin)
                                    // reset({
                                    //     data: `conditions.${delKey.delKey}`
                                    //   })
                                    // changeCoinPair(delKey.delKey)
                                    // const testCoin = `${c.target.value}BTC`
                                    //     setValue(`conditions.${delKey.delKey}.coin.name`, testCoin)    
                                }} 
                                className='rulemodule__body-selectcoin rulemodule__body-item'>
                                    <option value=''>coin</option>
                                    
                                        {coins.map((coin) => (
                                            <option value={coin} key={coin}>{coin}</option>
                                        ))}
                        </select>
                        
                        <div className='rulemodule__body-item'>has</div>

                        {
                            
                            mode === 'Condition'
                            ? <ConditionMode />
                            : mode === 'Tracking'
                            ? <TrackingMode />
                            : ''
                        }
                        </div>
                    </div>
                </div>
            )
        }

        const ActionRule = (delKey) => {
            const [actionmode, setActionMode] = useState('spot')
            const [risk, setRisk] = useState('SimpleStopLoss')
            const [action, setAction] = useState('BUY')
            const [actionCoin, setActionCoin] = useState('BTC')
            // setValue(`actions.${delKey.delKey}.${mode}`)

            useEffect(() => {
                setValue(`actions.${delKey.delKey}.coin`, action)
            }, [action])

            useEffect(() => {
                setValue(`actions.${delKey.delKey}.action_type`, actionCoin)
            }, [actionCoin])

            const SpotMode = () => {

                return (
                    <div>
                        
                    </div>
                )
                
            }

            const FuturesMode = () => {
                return (
                    <div className='Ifrulemodule_body-item rulemodule_body-item'>
                            <label>credit shoulder</label>
                            <input {...register(`actions.${delKey.delKey}.${actionmode}.credit_shoulder`, {
                                valueAsNumber: true,
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    }
                            })} type='number' style={{width: '50px'}} />
                    </div>
                )
            }

            const SimpleStopLoss = () => {
                return (
                    <div>
                        <label>entry price</label>
                            <input {...register(`actions.${delKey.delKey}.${actionmode}.risk_management.simple_stoploss.entry_price`, {
                                valueAsNumber: true,
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    }
                            })} type='number' style={{width: '50px'}} />
                        <label>exit price</label>
                            <input {...register(`actions.${delKey.delKey}.${actionmode}.risk_management.simple_stoploss.exit_price`, {
                                valueAsNumber: true,
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    }
                            })} type='number' style={{width: '50px'}} />
                    </div>
                )
            }

            const TrailingStopLoss = () => {
                return (
                    <div className='Ifrulemodule_body-item rulemodule_body-item'>
                                <label>ratio</label>
                                <input {...register(`actions.${delKey.delKey}.${actionmode}.risk_management.trailing_stoploss.ratio`, {
                                        setValueAs: v => Number.parseFloat(v),
                                        validate: {
                                            positive: v => Number.parseFloat(v) > 0 && Number.parseFloat(v) <= 1,
                                            }
                                    })} type='float' style={{width: '50px'}} />
                            </div>
                )
            }

            return (
                <div className="rulemodule">
                    <header className='rulemodule__header' style={{}}>
                        <span style={{color: 'green', width:'75px', borderBottom: '3px solid green'}}>Action</span>
                        <button className='rulemodule__header-delbtn' onClick={() => deleteRuleModule(delKey.delKey)}>+</button>
                    </header>
                    <div className="rulemodule__body" style={{boxShadow: '-2px 3px 5px 0px #09a100', height: '140px', textAlign: 'left'}}>
                        <div className='ActionRuleModule-item rulemodule_body-item' style={{flexDirection: 'column', width: '50%'}}>
                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                                <div className="rulemodule__body-item">
                                {/* <Controller
                                    control={control}
                                    name={`actions.${delKey.delKey}.action_type`}
                                    render={({ field }) => ( */}
                                    <select 
                                    // {...field}
                                    onChange={(a) => setAction(a.target.value)}
                                    value={action}
                                     name="buy" className='rulemodule__body-selectother'>
                                        {/* <option value=''>action</option> */}
                                        <option value="BUY">BUY</option>
                                        <option value="SELL">SELL</option>
                                        <option value="HOLD">HOLD</option>
                                    </select>
                                    {/* )}
                                /> */}
                                </div>
                                <div className="rulemodule__body-item">
                                {/* <Controller
                                    control={control}
                                    name={`actions.${delKey.delKey}.coin`}
                                    render={({ field }) => ( */}
                                        <select 
                                        // {...field}
                                        // {...register(`conditions.${delKey.delKey}.coin1`)} 
                                        name={delKey.delKey} 
                                        onChange={(c) => {setActionCoin(c.target.value)}} 
                                        className='rulemodule__body-selectcoin'>
                                            {/* <option value=''>coin</option> */}
                                            
                                                {coins.map((coin) => (
                                                    <option value={coin} key={coin}>{coin}</option>
                                                ))}
                                        </select>
                                    {/* )}
                                /> */}
                                </div> 
                            </div>
                            

                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                                Mode: <input type="radio" id="actionmodeChoice1"
                                        // name={`mode.mode${delKey.delKey}`} 
                                        // {...register(`mode.${delKey.delKey}`)}
                                        checked={actionmode === 'spot' ? true : false} 
                                        value="spot" 
                                        onClick={(type) => {
                                            unregister(`actions.${delKey.delKey}.futures`)
                                              setValue(`actions.${delKey.delKey}.coin`, action)
                                                setValue(`actions.${delKey.delKey}.action_type`, actionCoin)
                                            setActionMode(type.target.value)
                                        
                                    }}
                                        />
                                        <label htmlFor="contactChoice1">Spot</label>
                                        
                                        <input type="radio" id="actionmodeChoice2"
                                        // {...register(`mode.${delKey.delKey}`)}
                                        // name={`mode.mode${delKey.delKey}`}
                                        checked={actionmode === 'futures' ? true : false} 
                                        value="futures" 
                                        onClick={(type) => {
                                            unregister(`actions.${delKey.delKey}.spot`)
                                              setValue(`actions.${delKey.delKey}.coin`, action)
                                            setValue(`actions.${delKey.delKey}.action_type`, actionCoin)
                                            setActionMode(type.target.value)
                                            // reset({
                                        //     data: `actions.${delKey.delKey}`
                                        //   })
                                    }}
                                        />
                                        <label htmlFor="contactChoice2">Futures</label>
                            </div>

                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                            Risk: <input type="radio" id="actionmodeChoice1"
                                    // name={`mode.mode${delKey.delKey}`} 
                                    // {...register(`mode.${delKey.delKey}`)}
                                    checked={risk === 'SimpleStopLoss' ? true : false} 
                                    value="SimpleStopLoss" 
                                    onClick={(type) => {
                                        unregister(`actions.${delKey.delKey}.${actionmode}.risk_management`)
                                          setValue(`actions.${delKey.delKey}.coin`, action)
                                            setValue(`actions.${delKey.delKey}.action_type`, actionCoin)
                                        setRisk(type.target.value)
                                        // reset({
                                        //     data: `actions.${delKey.delKey}`
                                        //   })
                                }}
                                    />
                                    <label htmlFor="contactChoice1">Simple SL</label>
                                    
                                    <input type="radio" id="riskChoice2"
                                    // {...register(`mode.${delKey.delKey}`)}
                                    // name={`mode.mode${delKey.delKey}`}
                                    checked={risk === 'TrailingStopLoss' ? true : false} 
                                    value="TrailingStopLoss" 
                                    onClick={(type) => {
                                        unregister(`actions.${delKey.delKey}.${actionmode}.risk_management`)
                                          setValue(`actions.${delKey.delKey}.coin`, action)
                                            setValue(`actions.${delKey.delKey}.action_type`, actionCoin)
                                        setRisk(type.target.value)
                                        
                                }}
                                    />
                                    <label htmlFor="contactChoice2">Trailing SL</label>
                            </div>

                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                            {
                                risk === 'SimpleStopLoss'
                                ? <SimpleStopLoss />
                                : risk === 'TrailingStopLoss'
                                ? <TrailingStopLoss />
                                : ''
                            }
                            </div>

                            
                        </div>
                        
                        <div className='ActionRuleModule-item' style={{ width: '50%'}}>
                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                                <label>maximal amount</label>
                                <input {...register(`actions.${delKey.delKey}.maximal_amount`, {
                                valueAsNumber: true,
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    }
                            })} type='number' style={{width: '50px'}} />
                            </div>
                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                            <label>amount bet</label>
                            <input {...register(`actions.${delKey.delKey}.${actionmode}.amount_bet`, {
                                valueAsNumber: true,
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    }
                            })} type='number' style={{width: '50px'}} />
                            </div>

                            <div className='Ifrulemodule_body-item rulemodule_body-item'>
                                <label>percentage order</label>
                                <input {...register(`actions.${delKey.delKey}.percentage_order`, {
                                        setValueAs: v => Number.parseFloat(v),
                                        validate: {
                                            positive: v => Number.parseFloat(v) > 0,
                                            }
                                    })} type='float' style={{width: '50px'}} />
                            </div>
                            
                        {
                            
                            actionmode === 'spot'
                            ? <SpotMode />
                            : actionmode === 'futures'
                            ? <FuturesMode />
                            : ''
                        }
                        
                        </div>
                        
                        
                    </div>
                </div>
            )
        }

        const OperatorRule = (delKey) => {
            const soldCheckbox = ({ target: { checked } }) => {
                console.log(checkAnotherRule, checked);
                setCheckAnotherRule(checked)
            };
            return (
                <div className="rulemodule">
                    <header className='rulemodule__header' style={{}}>
                        <span style={{color: 'pink',width:'75px', borderBottom: '3px solid pink'}}>Operator</span>
                        {/* <button className='rulemodule__header-delbtn' onClick={() => deleteRuleModule(delKey.delKey)}>+</button> */}
                    </header>
                    <div className="rulemodule__body" style={{boxShadow: '-2px 3px 5px 0px pink'}}>
                        <div className="rulemodule__body-item">
                            in case of success run another rule 
                            {/* <input type='checkbox' 
                            checked={checkAnotherRule} 
                            onChange={(check) => setCheckAnotherRule(check.target.checked)}  
                            /> */}
                            
                            <Controller
                                    control={control}
                                    
                                    name={`run_another_rule`}
                                    render={({ field }) => (
                                        <select 
                                        // id="datetimeinput"
                                        className='datepicker-input'
                                        style={{marginLeft: '5px',width: '30px', textAlign: 'left'}}
                                        {...field}
                                        >
                                            <option value={1} >1</option>
                                            <option value={2} >2</option>
                                            <option value={3} >3</option>
                                            <option value={4} >4</option>
                                            <option value={5} >5</option>
                                            
                                                
                                        </select>
                                    )}
                                />
                        </div>
                    </div>
                </div>
            )
        }

    // special block with name and time
        const SpecsRule = () => {
            const soldCheckbox = ({ target: { checked } }) => {
                setCheckSchedule(checked);
            };

            return (
                <div className="rulemodule">
                    <header className='rulemodule__header'>
                        <span style={{color: 'orange',borderBottom: '3px solid orange', width: '100px'}}>GO</span>
                    </header>
                    <div className={`rulemodule__body `} style={{boxShadow: '-2px 3px 5px 0px orange', height: `${checkSchedule ?  '100px': '145px'}`}}>
                        <div className="rulemodule__body-go">
                            <div className="rulemodule__body-go_item">Name your rule</div>
                            <div className="rulemodule__body-go_item">
                                <input 
                                id="rulename" 
                                placeholder='The best strategy in the world!'
                                // value={title || ""}
                                // onChange={handleTitleChange}
                                // isInvalid={!title}
                                {...register('titleChange', {required: 'aboba'})}
                                />
                                
                            </div>
                            <div className="rulemodule__body-go_item">
                                <input 
                                checked={checkSchedule} onChange={soldCheckbox} 
                                // {...register('controlledLaunch')}
                                type="checkbox" id="scales" name="scales" />
                                <label htmlFor="scales">Save with no start (for other rules)</label>
                            </div>
                            {checkSchedule ? ''
                            :
                            <div className="rulemodule__body-go_time rulemodule__body-go_item">
                                
                                

                            <div className="rulemodule__body-item" style={{margin: 'auto', marginRight: '10px'}}>Start</div>
                            <div className="rulemodule__body-item">
                                {/* <button></button> */}
                                <input 
                                // type="datetime-local" 
                                id="datetimeinput" name="trip-start"
                                type="text"
                                // onChange={(e) => console.log(e.target.value)}
                                onFocus={(e) => (e.target.type = "datetime-local")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder='Immediately'
                                    // onChange={handleLifeStart}
                                    // value={startDate || 'Immediately'}
                                    {...register('scheduled_start_time')}
                                    // `${year}.${month}.${tomorrowDay}`
                                    min={MyDateString} className='datepicker-input'/>
                            </div>
                            <div className="rulemodule__body-item" style={{margin: 'auto', marginRight: '10px'}}>
                                for
                            </div>
                            <div className="rulemodule__body-item">
                                {/* <button></button> */}
                                <input type="number" id="datetimeinput" name="trip-start"
                                    style={{width: '30px', textAlign: 'center'}}
                                    // onChange={handleLifeTime}
                                    // value={executeMinutes || ""}
                                    // isInvalid={!executeMinutes}
                                    defaultValue={5}
                                    {...register('rule_work_timeout')}
                                    placeholder='5'
                                    className='datepicker-input'/>
                            </div>
                            <div className="rulemodule__body-item" style={{margin: 'auto', marginRight: '10px'}}>
                                minutes
                            </div>
                            <div className="rulemodule__body-item" style={{margin: 'auto', marginRight: '10px'}}>
                            <Controller
                                    control={control}
                                    
                                    name={`retry_succesful`}
                                    render={({ field }) => (
                                        <select 
                                        id="datetimeinput"
                                        className='datepicker-input'
                                        defaultValue={1}
                                        style={{marginLeft: '5px',width: '50px', textAlign: 'left'}}
                                        {...field}
                                        >
                                            <option value={1} >1</option>
                                            <option value={2} >2</option>
                                            <option value={3} >3</option>
                                            <option value={4} >4</option>
                                            <option value={5} >5</option>
                                            
                                                
                                        </select>
                                    )}
                                />
                            </div>
                            <div className="rulemodule__body-item" style={{margin: 'auto', marginRight: '10px'}}>
                                times
                            </div>
                            
                            </div>
                            }
                            
                        </div>
                        
                    </div>
                </div>
            )
        }
        

  return (
    <div className="tradingbots">
        <header className="header">
            <div className="header__left">
                <h2 style={{marginBottom: '10px'}}>Create your ideas</h2>
                <span><img/>Top rules-bots per</span>
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
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="strategy tb__main-block">
                <h3>Create strategy</h3>
                {/* <RuleModule type={"SPECS"} /> */}
                <SpecsRule/>
                
                <div className="addmodule-btn_div">
                    <button onClick={() => setToggleRuleBtn(!toggleRuleBtn)} className={`openbtns ${toggleRuleBtn ? 'rotateopenbtns' : ''}`} style={{}}>+</button>
                    
                    {toggleRuleBtn && (
                        <div className={`addmodule-otherbtn_div ${toggleRuleBtn === false ? 'hidden' : '' }`}>
                        <button className='addmodule-btn' style={{backgroundColor: 'blue'}} onClick={() => {addRuleBlock('IF'); setIfRule(ifRule + 1)}}>If</button>
                        <button className='addmodule-btn' style={{backgroundColor: 'green'}} onClick={() => {addRuleBlock('ACTION'); setActionRule(actionRule + 1)}}>Action</button>
                        { operatorRule === 1 ? '' : <button className='addmodule-btn' style={{backgroundColor: 'pink'}} onClick={() => {addRuleBlock('OPERATOR'); setOperatorRule(operatorRule + 1)}}>Operator</button> }
                        </div>
                    )}
                </div>
                
                
                {ruleModules.map((ruleModule) => {
                    return ruleModule
                })}


            </div>
            <div className="valuepair tb__main-block">
                <button type='submit' className="savebtn" onClick={() => {setBtnClick(1)}}>Save rule</button>
            </div>
            </form>
        </div>
    </div>
    
  )
}

export default Rules