try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "checkZIndexLevels",
		[
			"underscore"
		],
		function construct( ){
			var checkZIndexLevels = function checkZIndexLevels( parentContainer ){
				if( !( parentContainer instanceof $ ) ){
					throw new Error( "invalid parent container" );
				}

				//z-index may start by a reference of the z-index of the container.
				var parentZIndex = parentContainer.css( "z-index" ) || 1;

				var nodeList = parentContainer[ 0 ].childNodes;
				var zIndexList = [ ];
				var zIndexCount = nodeList.length;
				for( var index = 0; index < zIndexCount; index++ ){
					var node = $( nodeList[ index ] );
					zIndexList.push( parseInt( node.css( "z-index" ) ) ) );
				}

				//If all of them as the same index.
				if( _.union( zIndexList, zIndexList ).length == 1 ){
					return true;
				}

				//Check if the z-indices corresponds to the proper order.
				var sortedZIndexList = _.sortBy( zIndexList );
				for( var index = 1; index < sortedZIndexList.length; index++ ){
					var zIndex = sortedZIndexList[ index - 1 ];
					if( zIndex != index && zIndex != ( parentZIndex + index ) ){
						return false;
					}
				}
				return true;
			};
			base.checkZIndexLevels = checkZIndexLevels;
			return checkZIndexLevels;
		} );
} )( base );