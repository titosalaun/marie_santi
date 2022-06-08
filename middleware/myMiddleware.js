export default function(ctx) {
	console.log("route : " + ctx.route.fullPath)
  if(ctx.route.fullPath == '/')
    ctx.redirect(301, '/fonts')
}