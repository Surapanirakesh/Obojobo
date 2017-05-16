let CommandHandler;
let { Editor } = window;
import ObojoboDraft from 'ObojoboDraft'

let { TextGroupCommandHandler } = Editor.chunk.textChunk;
let { Chunk } = ObojoboDraft.models;
let { TextGroupSelection } = ObojoboDraft.textGroup;

export default (CommandHandler = class CommandHandler extends TextGroupCommandHandler {
	onEnter(selection, chunk, shiftKey) {
		chunk.markDirty();

		if (!shiftKey) {
			chunk.splitText();
			return;
		}

		let newChunk = Chunk.create();
		chunk.addChildAfter(newChunk);
		return newChunk.selectStart();
	}

	onSelectAll(selection, chunk) {
		let tgs = new TextGroupSelection(chunk, selection.virtual);
		if (tgs.type === 'multipleTextSpan') {
			return false;
		}

		tgs.selectText(tgs.start.groupIndex);
		return true;
	}
});

	// deleteSelection: (selection, chunk) ->
	// 	super selection, chunk

	// 	tg = chunk.modelState.textGroup
	// 	if(tg.length is 1)
	// 		tg.add()

	// deleteText: (selection, chunk, deleteForwards) ->
	// 	super selection, chunk, deleteForwards

	// 	tg = chunk.modelState.textGroup
	// 	if(tg.length is 1)
	// 		tg.add()

	// deleteSelection: (selection, chunk) ->
	// 	chunk.markDirty()

	// 	tgs = new TextGroupSelection chunk, selection.virtual
	// 	tg = chunk.modelState.textGroup

	// 	tg.deleteSpan tgs.start.groupIndex, tgs.start.offset, tgs.end.groupIndex, tgs.end.offset, false

	// 	pos = selection.virtual.getPosition chunk
	// 	switch pos
	// 		when 'start', 'contains'
	// 			selection.virtual.collapse()
	// 		when 'end'
	// 			selection.virtual.end = TextGroupSelection.getGroupStartCursor(chunk).virtualCursor

	// deleteText: (selection, chunk, deleteForwards) ->
	// 	chunk.markDirty()

	// 	tgs = new TextGroupSelection chunk, selection.virtual
	// 	data = chunk.modelState

	// 	s = tgs.start

	// 	if s.isTextStart and s.textGroupItem.data.indent > 0
	// 		s.textGroupItem.data.indent--
	// 		return

	// 	super selection, chunk, deleteForwards


	// onTab: (selection, chunk, untab) ->
	// 	chunk.insertText "\t"

	// indent: (selection, chunk, decreaseIndent) ->
	// 	chunk.markDirty()

	// 	data = chunk.modelState
	// 	tgs = new TextGroupSelection chunk, selection.virtual

	// 	all = tgs.getAllSelectedTexts()

	// 	for textItem in all
	// 		if textItem.data.indent? and not isNaN(textItem.data.indent)
	// 			if not decreaseIndent
	// 				textItem.data.indent++
	// 			else if textItem.data.indent > 0
	// 				textItem.data.indent--
