
/** 
 *	llib
 */
function delib_extend( oCopyTo, oCopyFrom, bMakeLowerCaseKey )
{
	var sPropName;
	var sPropNameLC;

	for ( sPropName in oCopyFrom )
	{
		if ( $lisb( bMakeLowerCaseKey ) && bMakeLowerCaseKey )
		{
			sPropNameLC = $.trim( sPropName ).toLowerCase();
			oCopyTo[ sPropNameLC ] = oCopyFrom[ sPropName ];
		}
		else
		{
			oCopyTo[ sPropName ] = oCopyFrom[ sPropName ];
		}
	}
}
function $le(){ return delib_extend.apply( this, arguments ); }

function delib_is_null( oObj )
{
	var sType;

	sType = $.type( oObj ).toLowerCase();
	return ( "undefined" === sType || "null" === sType );
}
function $lisnul(){ return delib_is_null.apply( this, arguments ); }

function delib_is_string( oObj )
{
	return ( "string" === $.type( oObj ).toLowerCase() );
}
function $liss(){ return delib_is_string.apply( this, arguments ); }

function delib_is_numeric( oObj )
{
	return ( $.isNumeric( oObj ) );
}
function $lisn(){ return delib_is_numeric.apply( this, arguments ); }

function delib_is_bool( oObj )
{
	return ( "boolean" === $.type( oObj ).toLowerCase() );
}
function $lisb(){ return delib_is_bool.apply( this, arguments ); }

function delib_is_object( oObj )
{
	return ( "[object Object]" === Object.prototype.toString.call( oObj ) ||
		"[object Blob]" === Object.prototype.toString.call( oObj ) );
}
function $liso(){ return delib_is_object.apply( this, arguments ); }

function delib_is_array( oObj )
{
	return ( oObj && ! $lisnul( oObj ) && $.isArray( oObj ) );
}
function $lisa(){ return delib_is_array.apply( this, arguments ); }

function delib_is_function( oObj )
{
	return ( oObj && ! $lisnul( oObj ) && $.isFunction( oObj ) );
}
function $lisfun(){ return delib_is_function.apply( this, arguments ); }

function delib_is_timestamp( nTimestamp )
{
	//	1325376000 is the timestamp of "2012-01-01 00:00:00"
	//	2145916800 is the timestamp of "2038-01-01 00:00:00"
	return ( $lisn( nTimestamp ) && nTimestamp > 1325376000 && nTimestamp < 2145916800 );
}
function $listm(){ return delib_is_timestamp.apply( this, arguments ); }

function delib_is_valid_date_object( oObj )
{
	//	d.valueOf() could also work
	return ( "[object Date]" === Object.prototype.toString.call( oObj ) && ( ! isNaN( oObj.getTime() ) ) );
}
function $lisvdo(){ return delib_is_valid_date_object.apply( this, arguments ); }

function delib_is_object_with_key( oObj, vKey )
{
	var bRet;
	var vKeyKey;

	bRet = false;

	if ( delib_is_object( oObj ) )
	{
		if ( "[object Array]" === Object.prototype.toString.call( vKey ) )
		{
			bRet	= true;
			for ( vKeyKey in vKey )
			{
				if ( ! oObj.hasOwnProperty( vKey[ vKeyKey ] ) )
				{
					bRet = false;
					break;
				}
			}
		}
		else if ( "[object String]" === Object.prototype.toString.call( vKey ) ||
			"[object Number]" === Object.prototype.toString.call( vKey ) )
		{
			bRet = oObj.hasOwnProperty( vKey );
		}
	}

	return bRet;
}
function $lisowk(){ return delib_is_object_with_key.apply( this, arguments ); }

function delib_is_valid_mobile( sMobile )
{
	var regPattern;

	//	...
	regPattern	= /^(?:13|14|15|16|17|18|19)[0-9]{9}$/;

	return ( $lslen( sMobile ) > 0 &&
		regPattern.test( sMobile ) );
}
function $lisvmob(){ return delib_is_valid_mobile.apply( this, arguments ); }

function delib_has_own( oObj, sKey )
{
	if ( ! $liso( oObj ) || 0 === $lslen( sKey, true ) ) 
	{
		return false;
	}
	return Object.prototype.hasOwnProperty.call( oObj, sKey );
}
function $lhasown(){ return delib_has_own.apply( this, arguments ); }

function delib_strlen( sString, bTrim )
{
	var nRet;
	var sNewString;

	if ( $lisnul( sString ) )
	{
		return 0;
	}

	nRet		= 0;
	sNewString	= new String( sString );
	if ( ! $lisnul( bTrim ) && bTrim )
	{
		nRet = $.trim( sNewString ).length;
	}
	else
	{
		nRet = sNewString.length;
	}

	return nRet;
}
function $lslen(){ return delib_strlen.apply( this, arguments ); }

/**
 *	the length of jquery object
 */
function delib_jlen( oObj )
{
	var nRet;

	//	...
	nRet = 0;

	if ( ! $lisnul( oObj ) && ( oObj instanceof jQuery ) )
	{
		//	oObj.length:
		//		The number of elements in the jQuery object.
		if ( ! $lisnul( oObj.length ) )
		{
			nRet = oObj.length;
		}
	}

	return nRet;
}
function $ljl(){ return delib_jlen.apply( this, arguments ); }

//	Binary safe case-insensitive string comparison
function delib_strcasecmp( sString1, sString2 )
{
	//
	//	RETURN	- 1 ( sString1 > sString2 ),
	//		  0 ( sString1 == sString2 ),
	//		 -1 ( sString1 < sString2 )
	//
	sString1 = ( new String( sString1 ) ).toLowerCase();
	sString2 = ( new String( sString2 ) ).toLowerCase();
	if ( sString1 > sString2 )
	{
		return 1;
	}
	else if ( sString1 === sString2 )
	{
		return 0;
	}

	return -1;
}
function $lscmp(){ return delib_strcasecmp.apply( this, arguments ); }

function delib_strncasecmp( sString1, sString2, nLength )
{
	//
	//	RETURN	-  < 0 if sString1 is less than sString2;
	//		   > 0 if sString1 is greater than sString2;
	//		  == 0 if they are equal.
	//
	var nDiff;
	var i;

	sString1 = ( sString1 + '' ).toLowerCase().substr( 0, nLength );
	sString2 = ( sString2 + '' ).toLowerCase().substr( 0, nLength );
	if ( sString1.length !== sString2.length )
	{
		if ( sString1.length < sString2.length )
		{
			nLength = sString1.length;
			if ( sString2.substr( 0, sString1.length ) === sString1 )
			{
				//	return the difference of chars
				return sString1.length - sString2.length;
			}
		}
		else
		{
			nLength = sString2.length;
			//	sString1 is longer than sString2
			if ( sString1.substr( 0, sString2.length ) === sString2 )
			{
				//	return the difference of chars
				return sString1.length - sString2.length;
			}
		}
	}
	else
	{
		//	Avoids trying to get a char that does not exist
		nLength = sString1.length;
	}

	for ( nDiff = 0, i = 0; i < nLength; i++ )
	{
		nDiff = sString1.charCodeAt( i ) - sString2.charCodeAt( i );
		if ( nDiff !== 0 )
		{
			return nDiff;
		}
	}

	return 0;
}
function $lsncmp(){ return delib_strncasecmp.apply( this, arguments ); }

function delib_array_to_object( ArrList, sItemKey )
{
	//
	//	ArrList		- [ {'key1':v1,'key2':v2,...}, ... ]
	//	sItemKey	- key1
	//	RETURN		- { v1 : {'key1':v1,'key2':v2,...} }
	//
	var oRet;
	var oItemData;
	var i;

	if ( $lisnul( ArrList ) ||
		! $lisa( ArrList ) ||
		$lisnul( ArrList.length ) ||
		0 === ArrList.length )
	{
		return {};
	}
	if ( 0 === $lslen( sItemKey, true ) )
	{
		return {};
	}

	//	...
	oRet = {};

	//	convert js array to object
	for ( i = 0; i < ArrList.length; i ++ )
	{
		//	...
		oItemData = ArrList[ i ];
		if ( ! $lisnul( oItemData ) &&
			! $lisnul( oItemData[ sItemKey ] ) )
		{
			//	{ 'mb_mid' : {object}, ... }
			oRet[ oItemData[ sItemKey ].toLowerCase() ] = oItemData;
		}
	}

	//	...
	return oRet;
}
function $lato(){ return delib_array_to_object.apply( this, arguments ); }

function delib_is_html_encoded( sString )
{
	if ( 0 === $lslen( sString, true ) )
	{
		return false;
	}
	return ( -1 === sString.indexOf("\"") && -1 === sString.indexOf("'") && -1 === sString.indexOf("<") && -1 === sString.indexOf(">") );
}
function $lishtmecd(){ return delib_is_html_encoded.apply( this, arguments ); }

function delib_html_encode( sString )
{
	if ( 0 === $lslen( sString, true ) )
	{
		return sString;
	}
	return $('<span>').text( sString ).html();
}
function $lhtmec(){ return delib_html_encode.apply( this, arguments ); }

function delib_html_decode( sString )
{
	if ( 0 === $lslen( sString, true ) )
	{
		return sString;
	}
	return $('<span>').html( sString ).text();
}
function $lhtmdc(){ return delib_html_decode.apply( this, arguments ); }

function delib_get_formated_html( sString )
{
	var sRet;

	if ( 0 === $lslen( sString, true ) )
	{
		return "";
	}

	sRet = ( new String( sString ) )
			.replace( " ", "&nbsp;" )
			.replace( /\r?\n|\r/g, "<br />" );
	return sRet;
}
function $lgfhtm(){ return delib_get_formated_html.apply( this, arguments ); }

function delib_parse_text_links( sHtml, oParam_ )
{
	//
	//	sHtml	- [in] html code
	//	oParam_	- [in]
	//		  {
	//			classes		: the list of class name
	//			target		: values('_blank','_media','_parent','_search','_self','_top')
	//			title		: the text of title
	//			tooltip		: the text of tooltip
	//		  }
	//
	//	RETURN	- new JQuery object
	//
	var sRet;
	var oRegexp;
	var sReplacedWith;
	var sClasses;
	var sTarget;
	var sTitle;
	var sTooltip;

	if ( ! $liss( sHtml ) )
	{
		return sHtml;
	}
	if ( 0 === $lslen( sHtml, true ) )
	{
		return "";
	}

	//	...
	sRet		= sHtml;
	oRegexp		= /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
	sReplacedWith	= "";
	sClasses	= "";
	sTarget		= "_self";
	sTitle		= "";
	sTooltip	= "";

	if ( undefined !== oParam_ && 'object' === typeof oParam_ )
	{
		if ( oParam_.hasOwnProperty('classes') )
		{
			sClasses = oParam_['classes'];
		}
		if ( oParam_.hasOwnProperty('target') )
		{
			sTarget = oParam_['target'];
		}
		if ( oParam_.hasOwnProperty('title') )
		{
			sTitle = oParam_['title'];
		}
		if ( oParam_.hasOwnProperty('tooltip') )
		{
			sTooltip = oParam_['tooltip'];
		}
	}

	//
	//	replaced string
	//	
	sReplacedWith = "<a href=\"$1\" class=\"" + sClasses + "\" target=\"" + sTarget + "\" title=\"" + sTitle + "\" tooltip=\"" + sTooltip + "\">$1</a>";
	sRet = ( new String( sHtml ) ).replace( oRegexp, sReplacedWith );

	return sRet;
}
function $lptlk(){ return delib_parse_text_links.apply( this, arguments ); }

function delib_parse_url( sUrl )
{
	var oA;

	oA = document.createElement( "a" );
	if ( oA )
	{
		oA.href = sUrl;
	}
	return oA;
}
function $lpurl(){ return delib_parse_url.apply( this, arguments ); }

function delib_get_highlight_text( sOrgText, sKey )
{
	var sRet;
	var sDecodedText;
	var sFormatedKey;
	var sTextLowerCase;
	var sKeyLowerCase;
	var nStartPos;
	var sOrgKey;

	//	...
	sDecodedText	= sOrgText;
	sFormatedKey	= $lhtmec( sKey );

	//	...
	sRet = sDecodedText;

	//	...
	if ( $lslen( sDecodedText, true ) > 0 && $lslen( sFormatedKey ) > 0 )
	{
		sTextLowerCase	= $.trim( sDecodedText ).toLowerCase();
		sKeyLowerCase	= $.trim( sFormatedKey ).toLowerCase();

		//	...
		nStartPos = sTextLowerCase.indexOf( sKeyLowerCase );
		if ( nStartPos >= 0 )
		{
			sOrgKey = sDecodedText.substr( nStartPos, $lslen( sFormatedKey ) );
			if ( $lslen( sOrgKey ) > 0 )
			{
				sRet = sDecodedText.replace( sOrgKey, "<font class=\"highlight\">" + sOrgKey + "</font>" );
			}
		}
	}

	//	...
	return sRet;
}
function $lghtxt(){ return delib_get_highlight_text.apply( this, arguments ); }

function delib_rd( sUrl, nTimeout )
{
	//
	//	sUrl		- [in] URL
	//	nTimeout	- [in] Timeout
	//
	if ( nTimeout )
	{
		window.setTimeout
		(
			function()
			{
				window.location.href = ( sUrl ? sUrl : window.location.href );
			},
			nTimeout
		);
	}
	else
	{
		window.location.href = ( sUrl ? sUrl : window.location.href );
	}
}
function $lrd(){ return delib_rd.apply( this, arguments ); }

function delib_reload( bReloadSource )
{
	var bReloadFromServer;

	if ( ! $lisnul( bReloadSource ) )
	{
		bReloadFromServer = bReloadSource;
	}
	else
	{
		bReloadFromServer = false;
	}
	
	window.setTimeout(function()
	{
		window.location.reload( bReloadFromServer );
	}, 10 );
}
function $lrld(){ return delib_reload.apply( this, arguments ); }

function delib_obs_exec( pfnCallbackCondition, nMilliSeconds, pfnCallbackComplete )
{
	//	obsessively execute
	var nInterval;

	//	...
	nInterval = window.setInterval
	(
		function()
		{
			if ( pfnCallbackCondition() )
			{
				//	...
				window.clearInterval( nInterval );
				nInterval = 0;

				//	...
				if ( pfnCallbackComplete )
				{
					pfnCallbackComplete();
				}
			}
		},
		nMilliSeconds
	);
}
function $loe(){ return delib_obs_exec.apply( this, arguments ); }

function delib_print_r( theObj, vSpecTab )
{
	var sRet	= "";
	var vTab	= vSpecTab ? vSpecTab : "\t";
	var vTab2	= vTab.substr( 0, vTab.length - 1 );
	if ( theObj.constructor === Array || theObj.constructor === Object )
	{
		sRet += ( typeof( theObj ) + "\n" + vTab2 + "(\n" );
		for ( var p in theObj )
		{
			if ( theObj[p].constructor === Array || theObj[p].constructor === Object )
			{
				sRet += ( vTab + "[" + p + "] => " + typeof( theObj ) + " " );
				sRet += delib_print_r( theObj[ p ], ( vTab + "\t" ) );
			}
			else
			{
				sRet += ( vTab + "[" + p + "] => " + theObj[ p ] + "\n" );
			}
		}
		sRet += ( vTab2 + ")\n" );
	}
	return sRet;
}
function $lpr(){ return delib_print_r.apply( this, arguments ); }

function delib_get_top_zindex( sSelector, nMaxLimit )
{
	var nRet;
	var nZIndex;
	var ArrZIndex = [];
	var nMaxZIndex;
	var nAutoIncrement;

	if ( '' === $.trim( sSelector ) )
	{
		return 0;
	}

	//	...
	nRet = 0;
	nMaxZIndex	= $lisnul( nMaxLimit ) ? -1 : nMaxLimit;

	//	...
	nAutoIncrement	= parseInt( $( "body" ).data( "delib_get_top_zindex_auto_increment" ) );
	if ( $lisn( nAutoIncrement ) && nAutoIncrement > 0 )
	{
		nAutoIncrement ++;
	}
	else
	{
		nAutoIncrement = 1;
	}
	$( "body" ).data( "delib_get_top_zindex_auto_increment", nAutoIncrement );

	//	...
	$( sSelector ).each(function()
	{
		nZIndex = parseInt( parseFloat( $(this).css("z-index") ) );
		if ( $.isNumeric( nZIndex ) )
		{
			if ( -1 !== nMaxZIndex )
			{
				if ( nZIndex < nMaxZIndex )
				{
					ArrZIndex.push( nZIndex );
				}
			}
			else
			{
				ArrZIndex.push( nZIndex );
			}
		}
	});

	if ( ArrZIndex.length > 0 )
	{
		nRet = Math.max( 1, Math.max.apply( Math, ArrZIndex ) );
	}

	//	...
	nRet += nAutoIncrement;

	return nRet;
}
function $lgtzi(){ return delib_get_top_zindex.apply( this, arguments ); }



function delib_mutation_observer( pfnCallbackCondition, pfnCallbackReady )
{
	if ( ! $lisfun( pfnCallbackCondition ) || ! $lisfun( pfnCallbackReady ) )
	{
		return false;
	}

	var nInterval;

	//	...
	nInterval = window.setInterval( function()
	{
		if ( pfnCallbackCondition() )
		{
			//	...
			window.clearInterval( nInterval );
			nInterval = null;

			console.log( "delib_mutation_observer, clearInterval nInterval" );

			//	...
			pfnCallbackReady();
		}

	}, 100 );

	//	...
	return true;
}
function $lmtobs(){ return delib_mutation_observer.apply( this, arguments ); }


function delib_get_event_info( oEvent, bDebug )
{
	var oTarg;
	var sTagName;
	var sClassName;
	var sId;

	//	...
	sTagName	= "";
	sClassName	= "";
	sId		= "";

	try
	{
		if ( ! oEvent )
		{
			oEvent = window.event;
		}
		if ( oEvent.target )
		{
			oTarg = oEvent.target;
		}
		else if ( oEvent.srcElement )
		{
			oTarg = oEvent.srcElement;
		}

		if ( 3 === oTarg.nodeType )	// defeat Safari bug
		{
			oTarg = oTarg.parentNode;
		}
	}
	catch( err ){}

	if ( oTarg )
	{
		sTagName	= oTarg.tagName.toLowerCase();
		sClassName	= oTarg.className;
		sId		= oTarg.id.toLowerCase();
	}

	if ( bDebug )
	{
		alert( "tagName:" + sTagName + ", calssName:" + sClassName + ", id:" + sId );
	}

	return { "tagName" : sTagName, "className" : sClassName, "id" : sId, "obj" : oTarg };
}
function $lgevinf(){ return delib_get_event_info.apply( this, arguments ); }


/**
 *	Created by liuqixing on June 5, 2017.
 *	Updated by liuqixing on July 9, 2017.
 */
function CDeLibLoading( _oParent )
{
	var m_oThis		= this;
	var m_sClassName	= "js-global-delib-loading";

	//	properties
	this.oParent		= _oParent;
	this.cLoading		= null;


	//	...
	this.show = function( sTitle, sExtraClassName )
	{
		var sClassName;

		//	...
		if ( 0 === $lslen( sTitle ) )
		{
			sTitle = "正在装载";
		}

		//	...
		sClassName = m_sClassName;
		if ( $lslen( sExtraClassName ) )
		{
			sClassName += ( " " + sExtraClassName );
		}

		//	...
		m_oThis.cLoading = weui.loading
		(
			sTitle, { className: sClassName }
		);

		//	...
		console.log( 'CDeLibLoading was shown' );
	};

	//	...
	this.hide = function( pfnCallback )
	{
		m_oThis.cLoading.hide( function()
		{
			if ( $lisfun( pfnCallback ) )
			{
				pfnCallback();
			}

			console.log( 'CDeLibLoading was hidden.' );
		});
	};

	//	...
	this.isShown = function()
	{
		return $( "." + m_sClassName ).is( ":visible" );
	};


	////////////////////////////////////////////////////////////
	//	Private

	function __construct()
	{
	}


	__construct();
}/**
 * Created by xing on 05/05/2017.
 */
function CDeLibMsgConfirm( _oParent )
{
	var m_oThis			= this;
	var m_sBoxSelector		= "#msg-confirm";
	var m_sDivMaskSelector		= m_sBoxSelector + " .js-div-mask";
	var m_sDivDialogSelector	= m_sBoxSelector + " .js-div-dialog";
	var m_sTitleSelector		= m_sBoxSelector + " .js-text-title";
	var m_sContentSelector		= m_sBoxSelector + " .js-text-content";
	var m_sBtnCancelSelector	= m_sBoxSelector + " .js-btn-cancel";
	var m_sBtnContinueSelector	= m_sBoxSelector + " .js-btn-continue";

	//	properties
	this.oParent		= _oParent;


	this.showConfirm = function( sTitle, sContent, pfnCallbackCancel, pfnCallbackContinue )
	{
		$( m_sTitleSelector ).text( sTitle );
		$( m_sContentSelector ).text( sContent );

		$( m_sBtnCancelSelector ).off( "click").on( "click", pfnCallbackCancel );
		$( m_sBtnContinueSelector ).off( "click").on( "click", pfnCallbackContinue );

		//	...
		$( m_sBoxSelector ).css( "z-index", $lgtzi( "div" ) + 1 );
		$( m_sDivMaskSelector ).css( "z-index", $lgtzi( "div" ) + 1 );
		$( m_sDivDialogSelector ).css( "z-index", $lgtzi( "div" ) + 1 );

		//	...
		$( m_sBoxSelector ).fadeIn( 200 );
	};

	this.hideConfirm = function()
	{
		$( m_sBoxSelector ).hide();
	};

}/**
 * Created by xing on 03/05/2017.
 */
function CDeLibMsgPage( _oParent, _nDuration )
{
	var m_oThis			= this;
	var m_sBoxSelector		= "#msg-page";
	var m_sIconSelector		= m_sBoxSelector + " .js-icon i";
	var m_sTitleSelector		= m_sBoxSelector + " .js-text-title";
	var m_sDescSelector		= m_sBoxSelector + " .js-text-desc";
	var m_sBtnOKSelector		= m_sBoxSelector + " .js-button-ok";
	var m_sBtnCancelSelector	= m_sBoxSelector + " .js-button-cancel";
	var m_nDuration			= ( 'number' === typeof _nDuration ? _nDuration : 200 );


	//	properties
	this.oParent		= _oParent;


	this.showMsgPage = function( sType, sTitle, sDesc, sBtnOK, pfnCallbackOK, sBtnCancel, pfnCallbackCancel )
	{
		var nWidth;

		//
		//	initialize message box
		//
		$( m_sIconSelector ).attr( "class", _getIconClassedByType( sType ) );
		$( m_sTitleSelector ).text( sTitle );
		$( m_sDescSelector ).text( sDesc );

		if ( $lslen( sBtnOK ) > 0 )
		{
			$( m_sBtnOKSelector ).text( sBtnOK )
				.off( "click" ).on( "click", pfnCallbackOK ? pfnCallbackOK : _callbackDefault );
		}
		else
		{
			$( m_sBtnOKSelector ).hide();
		}

		if ( $lslen( sBtnCancel ) > 0 )
		{
			$( m_sBtnCancelSelector ).text( sBtnCancel )
				.off( "click" ).on( "click", pfnCallbackCancel ? pfnCallbackCancel : _callbackDefault );
		}
		else
		{
			$( m_sBtnCancelSelector ).hide();
		}

		//	...
		nWidth = $( window ).width();
		$( m_sBoxSelector )
			.removeClass( "hide" )
			.css( "z-index", $lgtzi( "div" ) + 1 )
			.css( "left", nWidth + "px" )
			.css( "width", nWidth + "px" )
			.animate( { left: 0 }, m_nDuration, function(){} );

	};
	this.hideMsgPage = function()
	{
		return _hideMsgPage();
	};
	this.isMsgPageShown = function()
	{
		return _isMsgPageShown();
	};


	////////////////////////////////////////////////////////////////////////////////
	//	Private
	//

	function __construct()
	{
	}

	function _callbackDefault( oEvent )
	{
		oEvent.preventDefault();
		_hideMsgPage();
	}

	function _hideMsgPage()
	{
		$( m_sBoxSelector )
			.css( "z-index", $lgtzi( "div" ) + 1 )
			.css( "left", "0px" )
			.animate( { left: $( window ).width() }, m_nDuration, function()
			{
				$(this).addClass( "hide" );
			});
	}

	function _isMsgPageShown()
	{
		return ! $(m_sBoxSelector).hasClass( "hide" );
	}

	function _getIconClassedByType( sType )
	{
		if ( ! $liss( sType ) )
		{
			return "";
		}

		var sRet = "";

		switch( sType )
		{
			case "ok" :
				//	ok
				sRet = "weui-icon-success weui-icon_msg";
				break;
			case "err" :
				//	err
				sRet = "weui-icon-warn weui-icon_msg";
				break;
			default:
				//	wrn
				sRet = "weui-icon-warn weui-icon_msg-primary";
				break;
		}

		return sRet;
	}

	//	...
	__construct();
}/**
 *	Created by xing on 01/05/2017.
 */
function CDeLibTopToast( _oParent )
{
	var m_oThis		= this;
	var m_sBoardSelector	= "#top-toast";
	var m_sTextSelector	= m_sBoardSelector + " .text";
	var m_nDuration		= 200;
	var m_nDelay		= 3000;

	//	properties
	this.oParent		= _oParent;


	this.setDuration = function( nDuration )
	{
		if ( nDuration >= 200 && nDuration <= 1000 )
		{
			m_nDuration = nDuration;
		}

		return m_oThis;
	};
	this.setDelay = function( nDelay )
	{
		if ( nDelay > 1000 && nDelay < 10000 )
		{
			m_nDelay = nDelay;
		}

		return m_oThis;
	};

	this.showTopToast = function( sType, sMessage, nDelay )
	{
		m_oThis.setDelay( nDelay );
		_showTopToast( sType, sMessage );

		return m_oThis;
	};
	this.hideTopToast = function()
	{
		_hideTopToast();

		return m_oThis;
	};
	this.isTopToastShown = function()
	{
		return _isTopToastShown();
	};

	////////////////////////////////////////////////////////////
	//	Private

	function __construct()
	{
		_setEventHook();
	}

	function _setEventHook()
	{
		$(m_sBoardSelector).off( "click" ).on( "click", function( oEvent )
		{
			oEvent.preventDefault();
			_hideTopToast();
		});
	}

	function _isTopToastShown()
	{
		return ! $(m_sBoardSelector).hasClass( "hide" );
	}
	function _showTopToast( sType, sMessage )
	{
		//
		//	sMessage	- html
		//	sType		- values('ok','alert','error')
		//
		var sAddedClass;
		var nHeight;

		//	...
		sAddedClass	= _getClassNameByType( sType );

		//
		//	set the message to control for display
		//
		$(m_sTextSelector).text( sMessage );

		if ( ! _isTopToastShown() )
		{
			//	mark as shown
			//_setMessageBoardShown( true );

			//	...
			nHeight	= $(m_sBoardSelector)
				.css( "top", "-200px" )
				.removeClass( "hide top-toast-ok top-toast-wrn top-toast-err" )
				.outerHeight();

			$(m_sBoardSelector)
				.css( "z-index", $lgtzi( "div" ) + 1 )
				.css( "left", "0px" )
				.css( "top", ( -1 * nHeight ) + "px" )
				.addClass( sAddedClass )
				.animate( { top: 0 }, m_nDuration, function(){} )
				.delay( m_nDelay )
				.queue( function()
				{
					_hideTopToast();
					$( this ).dequeue();
				});
		}
	}

	function _hideTopToast()
	{
		var nHeight;

		if ( _isTopToastShown() )
		{
			//	...
			nHeight	= $(m_sBoardSelector)
				.removeClass( "hide" )
				.outerHeight();
			if ( nHeight > 0 )
			{
				$(m_sBoardSelector)
					.animate( { top: ( -1 * nHeight ) }, m_nDuration, function()
					{
						//	mark as hidden
						//_setMessageBoardShown( false );
						$(m_sBoardSelector).addClass( "hide" );
					});
			}
			else
			{
				$(m_sBoardSelector).addClass( "hide" );
			}
		}
	}

	function _getClassNameByType( sType )
	{
		var sRet;

		switch( sType )
		{
			case "ok" :
				sRet = "top-toast-ok";
				break;
			case "err" :
				sRet = "top-toast-err";
				break;
			case "wrn" :
				sRet = "top-toast-wrn";
				break;
			default:
				sRet = "top-toast-def";
				break;
		}

		return sRet;
	}


	//	...
	__construct();
}