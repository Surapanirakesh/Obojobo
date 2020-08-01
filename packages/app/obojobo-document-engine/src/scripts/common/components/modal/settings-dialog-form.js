import './settings-dialog-form.scss'
import React, {useMemo} from 'react'
import Switch from '../switch'
import 'obojobo-document-engine/src/scripts/common/components/switch.scss'

const renderInput = (item, value, onChange, ref) => {
	const id = `obojobo-draft-seetings--item-${item.prop}`
	switch(item.type){
		case 'switch':
			return <Switch id={id} checked={value === true} onChange={onChange} ref={ref} />

		case 'select':
			return (
				<select
					id={id}
					value={value}
					onChange={onChange}
					ref={ref}
				>
					{item.options.map(o => <option value={o}>{o}</option>)}
				</select>
			)

		case 'number':
			return (
				<input
					type={item.type}
					id={id}
					min={item.min || Number.NEGATIVE_INFINITY}
					max={item.max || Number.POSITIVE_INFINITY}
					step="1"
					disabled={item.editable === false}
					value={value || ''}
					placeholder={(item.placeholder || `${item.label} not set`) }
					onChange={onChange}
					ref={ref}
				/>
			)

		default:
			return (
				<input
					type={item.type || 'text'}
					id={id}
					disabled={item.editable === false}
					value={value || ''}
					placeholder={(item.placeholder || `${item.label} not set`) }
					onChange={onChange}
					ref={ref}
				/>
			)
	}
}

const SettingsFormCore = ({config, settings, onChange, forwardedRef}) => {
	// memoize onChange callback functions
	// a parallel array to config (index will match config index)
	const memoizedOnChanges = useMemo(
		() => {
			return config.map(configItem => {
				return event => { onChange(configItem, event)
			}})
		}, [config, onChange]
	)

	return (
		<div className="obojobo-draft-settings--form">
			{config.map((item, index) => {
				// lazily assign fowardedRef only to the first input
				const ref = index === 0 ? forwardedRef : null
				return item.type === 'heading'
					?  <h2>{item.text}:</h2>
					: <>
						<label htmlFor={`obojobo-draft-seetings--item-${item.prop}`}>
							{item.label}:
						</label>
						<div>
							{renderInput(item, settings[item.prop], memoizedOnChanges[index], ref)}
							{item.units
								? <span className="obojobo-draft-settings--units">{item.units}</span>
								: null
							}
						</div>
					</>
				}
			)}
		</div>
	)
}

// Add ability to forward refs for the purpose of focusing inputs
const SettingsForm = React.forwardRef((props, ref) => <SettingsFormCore {...props} forwardedRef={ref} />)
export default SettingsForm