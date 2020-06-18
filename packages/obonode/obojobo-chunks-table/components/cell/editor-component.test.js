import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Cell from './editor-component'

import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
jest.mock('slate-react')
jest.mock(
	'obojobo-document-engine/src/scripts/oboeditor/components/node/with-slate-wrapper',
	() => item => item
)

const TABLE_ROW_NODE = 'ObojoboDraft.Chunks.Table.Row'
const TABLE_NODE = 'ObojoboDraft.Chunks.Table'
const TABLE_CELL_NODE = 'ObojoboDraft.Chunks.Table.Cell'

describe('Cell Editor Node', () => {
	beforeEach(() => {
		jest.resetAllMocks()
		jest.restoreAllMocks()
	})

	test('Cell component', () => {
		const component = renderer.create(<Cell element={{ content: { header: false } }} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Cell component as header', () => {
		const component = renderer.create(<Cell element={{ content: { header: true } }} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Cell component selected', () => {
		const component = renderer.create(
			<Cell element={{ content: { header: false } }} selected={true} />
		)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Cell component as selected header', () => {
		const component = renderer.create(
			<Cell element={{ content: { header: true } }} selected={true} />
		)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Cell component handles tabbing', () => {
		const component = mount(
			<table>
				<thead>
					<tr>
						<Cell element={{ content: { header: true } }} selected={true} />
					</tr>
				</thead>
			</table>
		)

		component
			.find('button')
			.at(0)
			.simulate('keyDown', { key: 'k' })
		component
			.find('button')
			.at(0)
			.simulate('keyDown', { key: 'Tab', metaKey: 'true', shiftKey: 'true' })

		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Cell component opens drop down', () => {
		const component = mount(
			<table>
				<thead>
					<tr>
						<Cell element={{ content: { header: true } }} selected={true} />
					</tr>
				</thead>
			</table>
		)

		component
			.find('button')
			.at(0)
			.simulate('click')

		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Cell component adds row above', () => {
		jest.spyOn(Transforms, 'insertNodes').mockReturnValueOnce(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: {},
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(1)
			.simulate('click')

		expect(Transforms.insertNodes).toHaveBeenCalled()
	})

	test('Cell component adds header row above', () => {
		jest.spyOn(Transforms, 'insertNodes').mockReturnValueOnce(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValue(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { header: true },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								},
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: true } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(1)
			.simulate('click')

		expect(Transforms.insertNodes).toHaveBeenCalled()
		expect(Transforms.setNodes).toHaveBeenCalled()
	})

	test('Cell component adds row below', () => {
		jest.spyOn(Transforms, 'insertNodes').mockReturnValueOnce(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: {},
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(2)
			.simulate('click')

		expect(Transforms.insertNodes).toHaveBeenCalled()
	})

	test('Cell component adds col left', () => {
		jest.spyOn(Transforms, 'insertNodes').mockReturnValueOnce(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValue(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(3)
			.simulate('click')

		expect(Transforms.insertNodes).toHaveBeenCalled()
		expect(Transforms.setNodes).toHaveBeenCalled()
	})

	test('Cell component adds col right', () => {
		jest.spyOn(Transforms, 'insertNodes').mockReturnValueOnce(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValue(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(4)
			.simulate('click')

		expect(Transforms.insertNodes).toHaveBeenCalled()
		expect(Transforms.setNodes).toHaveBeenCalled()
	})

	test('Cell component deletes only row', () => {
		jest.spyOn(Transforms, 'removeNodes').mockReturnValueOnce(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(5)
			.simulate('click')

		expect(Transforms.removeNodes).toHaveBeenCalledWith(editor, { at: [0] })
	})

	test('Cell component deletes first row', () => {
		jest.spyOn(Transforms, 'removeNodes').mockReturnValueOnce(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValue(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						},
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(5)
			.simulate('click')

		expect(Transforms.removeNodes).toHaveBeenCalledWith(editor, { at: [0, 0] })
		expect(Transforms.setNodes).toHaveBeenCalled()
	})

	test('Cell component deletes non-first row', () => {
		jest.spyOn(Transforms, 'removeNodes').mockReturnValueOnce(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValueOnce(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						},
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 1, 0])

		component
			.find('button')
			.at(5)
			.simulate('click')

		expect(Transforms.removeNodes).toHaveBeenCalledWith(editor, { at: [0, 1] })
	})

	test('Cell component deletes only col', () => {
		jest.spyOn(Transforms, 'removeNodes').mockReturnValueOnce(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 1 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(6)
			.simulate('click')

		expect(Transforms.removeNodes).toHaveBeenCalledWith(editor, { at: [0] })
	})

	test('Cell component deletes col', () => {
		jest.spyOn(Transforms, 'removeNodes').mockReturnValue(true)
		jest.spyOn(Transforms, 'setNodes').mockReturnValue(true)

		const editor = {
			children: [
				{
					type: TABLE_NODE,
					content: { numCols: 2 },
					children: [
						{
							type: TABLE_NODE,
							subtype: TABLE_ROW_NODE,
							content: { header: true },
							children: [
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								},
								{
									type: TABLE_NODE,
									subtype: TABLE_CELL_NODE
								}
							]
						}
					]
				}
			]
		}
		const component = mount(
			<table>
				<tbody>
					<tr>
						<Cell element={{ content: { header: false } }} selected={true} editor={editor} />
					</tr>
				</tbody>
			</table>
		)

		ReactEditor.findPath.mockReturnValueOnce([0, 0, 0])

		component
			.find('button')
			.at(6)
			.simulate('click')

		expect(Transforms.removeNodes).toHaveBeenCalled()
	})
})
