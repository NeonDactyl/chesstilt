import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessWebService } from '../chess-web.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    console.log('lOoK aT mE');
    console.log('i\'M a PrOgRaMmEr, i\'M uSiNg DeV tOoLs');
    console.log('                                               ixzii:`                                                                                                ');
    console.log('                                              `M@@;`:*,                                                                                               ');
    console.log('                                              *x@#:*.`*.                                                                                              ');
    console.log('                                             `*`.``.+`.*                                                                                              ');
    console.log('                                             ,;`    ,*`i.                                                                                             ');
    console.log('                                             ,;``  ``*,.*                                                                                             ');
    console.log('                                             `i```````+`*`                                                                                            ');
    console.log('                                              *```````:i,;                                                                                            ');
    console.log('                                              i.`;*````+`+`                                                                                           ');
    console.log('                                              `*`;n``` :i,;                                                                                           ');
    console.log('                                               ;,.+.;.``+.*`                                                                                          ');
    console.log('                                                *.*n,```,+`*                                                                                          ');
    console.log('                                                :;`*.``,`i;::                          `.`                                                            ');
    console.log('                                                 *.,*`:i``*,*`       .:.     .;i;,`  .i+*+.                                                           ');
    console.log('                                           `.`   .+*+:*,```+:#:.` `,*+i**i:;*+i;;i++*+i;ii+.                                                          ');
    console.log('                                          ,*i***iiz,*z;````i+z;i***i;;;;;iii*+z#+;;;;;;;*;ii                                                          ');
    console.log('                                          *;;i*****#```````;@M:;;+#z+;;;;;;;znxnx*;;;ii*i;;*                                                          ');
    console.log('                                         :i;+nnnxnnxi``````n@@+:*nnnn;;;;;;;*#zz#i;;iii;;;;*                                                          ');
    console.log('                                     `.:i*;;*nnnxxxnz*.``:n@@xx:;i*+++++i;;;;;;;;;;;*;;;;;ii                                                          ');
    console.log('                                    `**ii;;;;;ii*+*i;ixxW@@@x*x;;i#nnnnnnn+;;;;;;;;;*;;;;;i:                                                          ');
    console.log('                                    .*;;;;;;;i+++*;;;;*@@@Wni*x;;#xnnnnnnnni;;;;;;;ii;;;;;*.                                                          ');
    console.log('                                 `,;i;;;;;;;;+xnxx*;;;zz#+*iinn;;i#nnnnnnz+;;;;;;**i;;;;;;i:                                                          ');
    console.log('                                ,+*;;;;;;;;;;;*+##i;+n#iiiiinn+;;;;;iiii;;;;;;;;i;;;;;;;;;;*.                                                         ');
    console.log('                               :+*+*;;;;*+++*;;;;i#nz*iiii;z#ni*i;;;i****i;;;i**+;;;;;;+z+;;*.                                                        ');
    console.log('                               *;;;i++++i;:;*+++*n#iiiiiiiz#z+;;i***i;;;;;iiii;:;i;;;;znnn+:;+                                                        ');
    console.log('                               +::::;;;;:::::;;;:n*iiiii*n##z:::::;;:::i++*;::::;*;;;*xnnnn;:+`                                                       ');
    console.log('                               ;i:;++++*;::::::::##++*+zn+zz:::::::::;i+###;:::::i;;;zxnxnn;;*                                                        ');
    console.log('                                :i;+##+*;::::::::;zzzzz##n*::::::::;++*i;;i++;:::i;;innnnnn;;*                 ,,                                     ');
    console.log('                                 .*;;;;*;:::::::::;+znnz*;::::::::i+i:i:::;:;*i::i;;innxnxz;;*               `#+z.                                    ');
    console.log('                                  .++;;z:::*:::::::::;::::::::::::;:::n::;z:::;::i;;;nxnnx+;;*              ,#;:+,                                    ');
    console.log('                                  ,#:::n;:;n:::::::::::::::::::::*i:::n*i*n::::::*;;;+nxxz;;;*`            ,#;::#.                                    ');
    console.log('                                 ,#z;;+x###x*::::::::::::::::::::izi##+ii*+#+::::*;;;;*#+;;;;i;           :#:;i:#`                                    ');
    console.log('                                 #:in+,````.*#;:::::::::::::::::::n+.```` ``:#;::ii;;;;;;;;;;;*i    ..`  :#::n*:+                                     ');
    console.log('                                `z:#;````````,z;:::::::::::::::::#:``   ``  `,#::;*i;;;;;;i*;;;*:  :*ii++z::++;:+                                     ');
    console.log('                                 ##;`;i:` `  `:#::::::::::::::::+;```   `.;:``*i::;ii;;;;;zx+;;ii :;`  `.#i#`+::+   ``                                ');
    console.log('                                 ,#,z+*#+`    `#;:::::::::::::::z```  ` iz+#z.,#:::;*;;;;ixn#;;ii.*```   .n. #::* +#zz`                               ');
    console.log('                                 i,#+xz;#: `   *i::::::::::::::;+`  ` `.z*x#*+`z:::;ii;;;*xx*;;i*+```    `*.`#::i,+#;#,                               ');
    console.log('                                 *.zn#@i+i     ii::::::::::::::i*``    ;#z#@*z.z::::;*;;;in+;;;;z,``     `;:`#:i;;iz;#z,                              ');
    console.log('                                 *.##Mn;z,   ``#;::::::::::::::;+``    ,z*Wn*+i*::::;*;;;;;;;;;;#``      `i,.+,*+*;##i;i                              ');
    console.log('                                 ;:.z#+zi`   `,#::::::::::::::::z``     *z++z,z:::::;*;;;;;;;;;#:``      ,+`:*:#z#+*z:i;                              ');
    console.log('                                 `+``:;. `   .+;:;::::::::::::::**`     `,i;,zi::::::*;;;;;;;i#n``      ,*` ;i:z*iz:z:+,                              ');
    console.log('                                  ,*` `    `.+i:;+:ii::::::::::::++.`  ```,+z;:::::::*;;;;;;inxz       ;i   i;:nii;*+:#`                              ');
    console.log('                                   ,+,````.i#i:;#i:#;:::::::::::::i##+++###i::*::::::i;;;;;;znx+     `#xnnnnM;:z:;;+:ii                               ');
    console.log('                                    .#z#+zz*::;zi::z:::::::::::::::ii;;;;::;i+i;::;i:;*i;;;innx#   `;nz#####x;;+*#:::#`                               ');
    console.log('                                     `#z+i;::izi::i#:::::::::::::::;*++***++*;:ii:;i::;ii;;+nnnx:,iz++#####+x;:iz;::+,                                ');
    console.log('                                       ;+::;##;:::#;:::::::::::::::::;;;;;;::::;;;i::::;i;;+xnnxn#*;;inxx#xMMi:+*::**                                 ');
    console.log('                                        *###i::::;#::::::::::::::::::::::::::::::;;:::::;i;*xnnni;;;;;ii+*+:nz:;;:*M#                                 ');
    console.log('                                      `+z*;:::::;#;:::::::::::::::::::::::::::::::::::::;i;;nxx#;;;;;;;;+i..nMz*+nMxM`                                ');
    console.log('                                      i*::::::::++:i*:::::::::::::::::::::::::::::::::::;i;;i+*;;;;*#;;;+,..#M@#Wxxxxi                                ');
    console.log('                                      +;::::::;*+::i+::::::::::::::::;::::::::::::::::::;*;;;;;;;;;nx*;;+...iMW@@xxxxn                                ');
    console.log('                                      +::::::;++:::*+::::::::::;+znxxxxn+;:::::::::::::::ii;;;;;;;ixn*;;+...,MM#@xxxxM.                               ');
    console.log('                                      :#;::;+#*::::;i::::::::inWWWMMMMMMW#:::::::::::::::;i**;;;;;inn;;;+;...nM#@Mxxxx*                               ');
    console.log('                                       ,+##n#::::::::::::::;nWWMWMWMMWWWM+:::::::::::;:::::;;*;;;;;;;;;;;+...+M@@Mxxxx#                               ');
    console.log('                                           *;:::::::::::::+MWMMMMWWMn#*i;:::::::;i*++++*;::::;i;;;;;;;;;;#...;MW@WxxMxi                               ');
    console.log('                                           *;:::::::::::;nWWMMMWMzi;::::::;::::;++++###++;:::;*;;;;;;;;;i*...,MMWxMn;                                 ');
    console.log('                                           +;::::::::::;xWWWWWn*;::::::;*+#;:::i#+++##+#+;::::*;;;;;;;;;i*....zxxM*`                                  ');
    console.log('                                           *;:::::::::;z*MWWzi:::::;*#zz+i:::::;*+#++++i;:::::ii;;;;;;;;i+....iMn,                                    ');
    console.log('                                           *;::::::::;n*:nz;::::i#z#*;;:::::::::::;;:::::;ii;:;i**ii;;;;;#,...iz`                                     ');
    console.log('                                           ii::::::::+izn*:::i#z+i::::::::::::::::::::::i+##+;:;:::*;;;i;*;.;+i.                                      ');
    console.log('                                           ;+:::::::*:n;;::*nzi:::::::::::::::::::::::::i##++;:::::;**ii*i##i`                                        ');
    console.log('                                           `z:::::::*`z;;*#;.i+i;:::::::::::::::::::::::;i*i;:::::::;;;;;**`                                          ');
    console.log('                                            *i:::::*. .+#i`   `,i*i;::::::::::::::::::::::::::::::;;;i+zi.                                            ');
    console.log('                                            `#:::::+             `zxz+*;;:::::::::::::::::::::;i*+#zxxxM`                                             ');
    console.log('                                             ;*:::i:            `zMxxxxxnz#+***iii;;iii***iiixxxxxxxxxxn                                              ');
    console.log('                                              +;::+             #Mxxxxxxxxxn```.,,,,,,.``   +xxxxxxxxxx+                                              ');
    console.log('                                              `+;:i            `MMMMMxxxxxMi                xxMMMMxxxxM:                                              ');
    console.log('                                               .#+.             iMM#inMxxxM`                xMM#:zMxxxx`                                              ');
    console.log('                                                `*              `z*:inMxxMi                 ,#M;:xMMxMi                                               ');
    console.log('                                                               `+i:*+znxx*                   `#:in##+;                                                ');
    console.log('                                                              `#;:+;                         ,*:+:                                                    ');
    console.log('                                                              ;i,in,                         *::z`                                                    ');
    console.log('                                                              .#i++#+.                       #:;#                                                     ');
    console.log('                                                              `iMx+;;+i`                    .+:in:`   ,+,                                             ');
    console.log('                                                             `n@@@@M;.:+:                   `#:#i+z+::@#@;                                            ');
    console.log('                                                             i####@@@n*#@+                   ,##+;:,izW##@;                                           ');
    console.log('                                                             x##WW#######n                     :+z:.`.i###@.                                          ');
    console.log('                                                             x##@@#######n                       .i#*,+####*                                          ');
    console.log('                                                             +###########+                         `+W@####:                                          ');
    console.log('                                                             `M#####MWWx*`                      `.,`i#####z                                           ');
    console.log('                                                              .z@@W+`                          ,M##@@###@x`                                           ');
    console.log('                                                                ``                             x#@W#####n                                             ');
    console.log('                                                                                               W#@@#####i                                             ');
    console.log('                                                                                               n######@#`                                             ');
    console.log('                                                                                               `+xWWn+.                                               ');

  }

}
