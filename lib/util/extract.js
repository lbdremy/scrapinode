// Dependencies
var url = require('url');

/**
 * Extract the name of the website from an uri
 * 
 * @param {String} uri
 *
 * @return {String} - name of the website
 */
exports.webname = function(uri){   
   var hostname = url.parse(uri).hostname;
   var explode = hostname.split('.');
   var siteName = '';
   var extensions = { 'arpa':  true,'root':  true,'aero':  true,'biz':  true,'cat':  true,'com':  true,'coop':  true,'edu':  true,'gov':  true,'info':  true,'int':  true,'jobs':  true,'mil':  true,'mobi':  true,'museum':  true,'name':  true,'net':  true,'org':  true,'pro':  true,'travel':  true,'ac':  true,'ad':  true,'ae':  true,'af':  true,'ag':  true,'ai':  true,'al':  true,'am':  true,'an':  true,'ao':  true,'aq':  true,'ar':  true,'as':  true,'at':  true,'au':  true,'aw':  true,'az':  true,'ba':  true,'bb':  true,'bd':  true,'be':  true,'bf':  true,'bg':  true,'bh':  true,'bi':  true,'bj':  true,'bm':  true,'bn':  true,'bo':  true,'br':  true,'bs':  true,'bt':  true,'bv':  true,'bw':  true,'by':  true,'bz':  true,'ca':  true,'cc':  true,'cd':  true,'cf':  true,'cg':  true,'ch':  true,'ci':  true,'ck':  true,'cl':  true,'cm':  true,'cn':  true,'co':  true,'cr':  true,'cu':  true,'cv':  true,'cx':  true,'cy':  true,'cz':  true,'de':  true,'dj':  true,'dk':  true,'dm':  true,'do':  true,'dz':  true,'ec':  true,'ee':  true,'eg':  true,'er':  true,'es':  true,'et':  true,'eu':  true,'fi':  true,'fj':  true,'fk':  true,'fm':  true,'fo':  true,'fr':  true,'ga':  true,'gb':  true,'gd':  true,'ge':  true,'gf':  true,'gg':  true,'gh':  true,'gi':  true,'gl':  true,'gm':  true,'gn':  true,'gp':  true,'gq':  true,'gr':  true,'gs':  true,'gt':  true,'gu':  true,'gw':  true,'gy':  true,'hk':  true,'hm':  true,'hn':  true,'hr':  true,'ht':  true,'hu':  true,'id':  true,'ie':  true,'il':  true,'im':  true,'in':  true,'io':  true,'iq':  true,'ir':  true,'is':  true,'it':  true,'je':  true,'jm':  true,'jo':  true,'jp':  true,'ke':  true,'kg':  true,'kh':  true,'ki':  true,'km':  true,'kn':  true,'kr':  true,'kw':  true,'ky':  true,'kz':  true,'la':  true,'lb':  true,'lc':  true,'li':  true,'lk':  true,'lr':  true,'ls':  true,'lt':  true,'lu':  true,'lv':  true,'ly':  true,'ma':  true,'mc':  true,'md':  true,'me':  true,'mg':  true,'mh':  true,'mk':  true,'ml':  true,'mm':  true,'mn':  true,'mo':  true,'mp':  true,'mq':  true,'mr':  true,'ms':  true,'mt':  true,'mu':  true,'mv':  true,'mW':  true,'mx':  true,'my':  true,'mz':  true,'na':  true,'nc':  true,'ne':  true,'nF':  true,'ng':  true,'ni':  true,'nl':  true,'no':  true,'np':  true,'nr':  true,'nu':  true,'nz':  true,'om':  true,'pa':  true,'pe':  true,'pF':  true,'pg':  true,'ph':  true,'pk':  true,'pl':  true,'pm':  true,'pn':  true,'pr':  true,'ps':  true,'pt':  true,'pw':  true,'py':  true,'qa':  true,'re':  true,'ro':  true,'rs':  true,'ru':  true,'rw':  true,'sa':  true,'sb':  true,'sc':  true,'sd':  true,'se':  true,'sg':  true,'sh':  true,'si':  true,'sj':  true,'sk':  true,'sl':  true,'sm':  true,'sn':  true,'so':  true,'sr':  true,'st':  true,'su':  true,'sv':  true,'sy':  true,'sz':  true,'tc':  true,'td':  true,'tf':  true,'tg':  true,'th':  true,'tj':  true,'tk':  true,'tl':  true,'tm':  true,'tn':  true,'to':  true,'tp':  true,'tr':  true,'tt':  true,'tv':  true,'tw':  true,'tz':  true,'ua':  true,'ug':  true,'uk':  true,'um':  true,'us':  true,'uy':  true,'uz':  true,'va':  true,'vc':  true,'ve':  true,'vg':  true,'vi':  true,'vn':  true,'vu':  true,'wf':  true,'ws':  true,'ye':  true,'yt':  true,'yu':  true,'za':  true,'zm':  true,'zw': true };
   for(var i = explode.length -1 ; i >= 0 ; i--){
      if(!extensions[explode[i]] ){
         var name = explode[i];
         break;
      }
   }
   return name;
}

exports.extension = function(uri){
   var pathname = url.parse(uri).pathname;
   var explode = pathname.split('.');
   var extension = explode[explode.length - 1];
   return extension;
}
