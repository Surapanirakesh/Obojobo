module.exports =
	getBackgroundImage: (asset) ->
		"url('" + asset.replace(/'/g, "\\'") + "')"

	TOOLBAR_BOLD: require 'svg-url?noquotes!./img/editor/toolbar/bold.svg'
	TOOLBAR_ITALIC: require 'svg-url?noquotes!./img/editor/toolbar/italic.svg'
	TOOLBAR_IMAGE: require 'svg-url?noquotes!./img/editor/toolbar/image.svg'
	TOOLBAR_INDENT: require 'svg-url?noquotes!./img/editor/toolbar/indent.svg'
	TOOLBAR_INSERT: require 'svg-url?noquotes!./img/editor/toolbar/insert.svg'
	TOOLBAR_OL: require 'svg-url?noquotes!./img/editor/toolbar/ol.svg'
	TOOLBAR_TABLE: require 'svg-url?noquotes!./img/editor/toolbar/table.svg'
	TOOLBAR_UL: require 'svg-url?noquotes!./img/editor/toolbar/ul.svg'
	TOOLBAR_UNINDENT: require 'svg-url?noquotes!./img/editor/toolbar/unindent.svg'

	TEXTMENU_BOLD: require 'svg-url?noquotes!./img/editor/textmenu/bold.svg'
	TEXTMENU_ITALIC: require 'svg-url?noquotes!./img/editor/textmenu/italic.svg'
	TEXTMENU_LINK: require 'svg-url?noquotes!./img/editor/textmenu/link.svg'
	TEXTMENU_SUB: require 'svg-url?noquotes!./img/editor/textmenu/sub.svg'
	TEXTMENU_SUP: require 'svg-url?noquotes!./img/editor/textmenu/sup.svg'

	BUTTON_EDIT: require 'svg-url?noquotes!./img/editor/buttons/edit.svg'
	BUTTON_TABLE_INSERT: require 'svg-url?noquotes!./img/editor/buttons/table-insert.svg'
	BUTTON_TABLE_INSERT_HOVER: require 'svg-url?noquotes!./img/editor/buttons/table-insert-hover.svg'
	BUTTON_TABLE_REMOVE: require 'svg-url?noquotes!./img/editor/buttons/table-remove.svg'
	BUTTON_TABLE_REMOVE_HOVER: require 'svg-url?noquotes!./img/editor/buttons/table-remove-hover.svg'