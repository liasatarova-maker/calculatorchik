const DATA={cats:{WIDE:"Широкоформатная печать",CANVAS:"Холсты",POLY:"Полиграфия",LETTERS:"Буквы и формы",PLOTTER:"Плоттерная резка",VOLUME:"Объёмные буквы",ADS:"Рекламные конструкции",BRAND:"Брендированная продукция",VOLUME_ADS:"Объёмные конструкции"},products:[
{c:"BANNER",cat:"WIDE",n:"Баннер",t:"area",priceModes:true,d:"Цена зависит от площади и вида баннерной ткани",v:[["Тонкий баннер менее 440 г",400,190],["Толстый баннер 440 г",400,250]],s:[["Проклей",60,"autoPerimeter"],["Люверсы",30,"autoEyelets"]]},
{c:"PLENKA_PRINT",cat:"WIDE",n:"Плёнка с печатью",t:"area",d:"Матовая, глянцевая, прозрачная, перфорированная",note:"Если у вашего макета фигурная форма реза, менеджер рассчитает его самостоятельно. Контур резки должен предоставляться в формате AI или CDR.",v:[["Матовая",600],["Глянцевая",600],["Прозрачная",600],["Перфорированная",800]]},
{c:"HOLST",cat:"CANVAS",n:"Холст на подрамнике",t:"fixed",priceModes:true,d:"Готовые размеры холстов",sizes:[[30,30,1750,750,150],[40,40,2000,1000,150],[50,50,2350,1350,200],[60,60,1750,750,250],[100,100,4350,3350,700],[30,21,1650,650,150],[30,40,1900,900,150],[30,45,1950,950,150],[40,50,2200,1200,150],[40,60,2300,1300,150],[50,60,2450,1450,200],[50,70,2650,1650,200],[60,70,2850,1850,250],[60,80,3000,2000,250],[60,90,3200,2200,250],[70,90,3450,2450,400],[70,100,3600,2600,400],[80,100,3850,2850,400],[80,120,4300,3300,600],[90,140,5000,4000,700],[100,150,5650,4650,700],[100,200,6900,5900,700]]},
{c:"SRA3",cat:"POLY",n:"Полиграфическая продукция",t:"sheet",d:"Раскладка изделий на листе SRA3 330 × 487 мм с полями 2 мм",v:[["Бумага 130 г · односторонняя",100],["Бумага 130 г · двусторонняя",150],["Бумага 270 г · односторонняя",100],["Бумага 270 г · двусторонняя",150],["Самоклеящаяся бумага · односторонняя",150],["Плёнка · односторонняя",300]]},
{c:"VISITKI",cat:"POLY",n:"Визитки",t:"cards",d:"Размер визитки — 9 × 5 см. Минимальный тираж — 120 шт., далее увеличение по 30 шт.",v:[["Односторонняя",550/120],["Двусторонняя",750/120]]},
{c:"BUKVA_MATERIAL",cat:"LETTERS",subtitle:"ПВХ, ПЭТ, ХДФ, акрил, полистирол, ДСП",n:"Буквы и формы из твёрдых материалов",t:"area",d:"Выберите тип изделия и материал",note:"Если у вашего макета фигурная форма реза, менеджер рассчитает его самостоятельно. Контур резки должен предоставляться в формате AI или CDR.",v:[["Акрил",5000],["Полистирол",4000],["ПВХ",3000],["ХДФ",1000],["ПЭТ",2000],["ДСП",700]]},

{c:"PLENKA_PLOTTER",cat:"PLOTTER",n:"Буквы и формы из плёнки",t:"area",d:"Виниловая или металлизированная плёнка",v:[["Виниловая",2000],["Металлизированная",2300]]},
{c:"BYKVA_OBIEM",cat:"VOLUME",n:"Объёмные буквы",t:"area",d:"Цена зависит от площади и типа изделия",v:[["Стандартные",12000],["С подсветкой",25000]]},
{c:"SATIN_PAPER",cat:"WIDE",n:"Сатиновая бумага",t:"area",d:"Широкоформатная печать на сатиновой бумаге",v:[["Сатиновая бумага",1000]]},
{c:"SHTENDERY",cat:"ADS",n:"Штендеры",t:"pending"},
{c:"ROLL_APY",cat:"ADS",n:"Ролл-апы",t:"pending"},
{c:"NAKLEYKI",cat:"POLY",n:"Наклейки",t:"pending"},
{c:"DTF_TKAN",cat:"BRAND",n:"Печать ДТФ по ткани",t:"pending"},
{c:"PAKETY",cat:"BRAND",n:"Пакеты",t:"pending"},
{c:"BEYDZHI",cat:"BRAND",n:"Бейджи",t:"pending"},
{c:"SVETOVOY_KOROB",cat:"VOLUME_ADS",n:"Световой короб",t:"pending"}
]};const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let cur=null,currentUnit="m",priceMode="retail";const unitFactor=()=>currentUnit==="m"?1:currentUnit==="cm"?0.01:0.001;const dimM=id=>(+$("#"+id).value||0)*unitFactor();const money=n=>new Intl.NumberFormat("ru-RU").format(Math.round(n))+" ₽";
const SRA3_WIDTH_MM=330,SRA3_HEIGHT_MM=487,SRA3_GAP_MM=2,SRA3_MARGIN_MM=2;
const SRA3_VARIANTS=[
  ["paper130","single"],["paper130","double"],["paper270","single"],["paper270","double"],["sticker","single"],["film","single"]
];
function calculateSra3Layout(widthMm,heightMm,quantity){
  if(!Number.isFinite(widthMm)||!Number.isFinite(heightMm)||widthMm<=0||heightMm<=0)return null;
  const fit=(w,h)=>{
    const columns=Math.max(0,Math.floor((SRA3_WIDTH_MM-2*SRA3_MARGIN_MM+SRA3_GAP_MM)/(w+SRA3_GAP_MM)+1e-9));
    const rows=Math.max(0,Math.floor((SRA3_HEIGHT_MM-2*SRA3_MARGIN_MM+SRA3_GAP_MM)/(h+SRA3_GAP_MM)+1e-9));
    return {columns,rows,perSheet:columns*rows};
  };
  const straight=fit(widthMm,heightMm),rotated=fit(heightMm,widthMm);
  const useRotation=rotated.perSheet>straight.perSheet;
  const best=useRotation?rotated:straight;
  if(best.perSheet<1)return null;
  const copies=Math.max(1,Math.ceil(quantity));
  return {...best,rotated:useRotation,sheets:Math.ceil(copies/best.perSheet)};
}
const sraMm=id=>(+$("#"+id).value||0)*(currentUnit==="cm"?10:currentUnit==="m"?1000:1);
function updateSraVariant(){
  const material=$("#sraMaterial").value;
  const doubleAllowed=material==="paper130"||material==="paper270";
  $("#sraSides").disabled=!doubleAllowed;
  if(!doubleAllowed)$("#sraSides").value="single";
  document.querySelectorAll(".sraSideChip").forEach(button=>{
    const unavailable=button.dataset.side==="double"&&!doubleAllowed;
    button.disabled=unavailable;
    const active=button.dataset.side===$("#sraSides").value;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  $("#sraSidesHint").textContent=doubleAllowed
    ?"Для бумаги возможна односторонняя и двусторонняя печать."
    :"Для этого материала доступна только односторонняя печать.";
  const idx=SRA3_VARIANTS.findIndex(v=>v[0]===material&&v[1]===$("#sraSides").value);
  $("#variant").value=String(Math.max(0,idx));
}
function restoreSraVariant(index){
  const item=SRA3_VARIANTS[index]||SRA3_VARIANTS[0];
  $("#sraMaterial").value=item[0];
  $("#sraSides").value=item[1];
  updateSraVariant();
}
function refreshUnitControls(){
  document.querySelectorAll(".unit").forEach(b=>{
    const active=b.dataset.unit===currentUnit;
    b.classList.toggle("active",active);
    b.setAttribute("aria-pressed",active?"true":"false");
  });
  document.querySelectorAll(".unitLabel").forEach(n=>n.textContent=currentUnit);
  if(cur?.c==="SRA3"){
    const minimum=currentUnit==="cm"?"0.1":"1";
    const step=currentUnit==="cm"?"0.1":"1";
    ["w","h"].forEach(id=>{const el=$("#"+id);el.min=minimum;el.step=step});
  }
}

// Two types share the hard-materials product; DSP is offered for forms only.
let hardType="letters";
function updateHardType(){
  if(cur?.c!=="BUKVA_MATERIAL")return;
  const shapes=hardType==="shapes";
  document.querySelectorAll(".hardTypeChip").forEach(b=>{
    const active=b.dataset.hardType===hardType;
    b.classList.toggle("active",active);
    b.setAttribute("aria-pressed",String(active));
  });
  const dspIndex=cur.v.findIndex(row=>row[0]==="ДСП");
  if(dspIndex>=0){
    const option=$("#variant").options[dspIndex];
    if(option)option.disabled=!shapes;
    const chip=document.querySelector('.variantChips .variantChip[data-vi="'+dspIndex+'"]');
    if(chip){chip.classList.toggle("hidden",!shapes);chip.disabled=!shapes}
    if(!shapes && +$("#variant").value===dspIndex)$("#variant").value="0";
  }
  const selected=+$("#variant").value||0;
  document.querySelectorAll(".variantChips .variantChip").forEach(b=>
    b.classList.toggle("active",+b.dataset.vi===selected));
}
document.querySelectorAll(".hardTypeChip").forEach(b=>b.addEventListener("click",()=>{
  if(cur?.c!=="BUKVA_MATERIAL")return;
  hardType=b.dataset.hardType==="shapes"?"shapes":"letters";
  updateHardType();
  calc();
}));
// Keep unfinished calculations separately for each product on this page.
const productDrafts=new Map();
function rememberProductDraft(){
  if(!cur||cur.t==="pending")return;
  productDrafts.set(cur.c,{
    variant:$("#variant").value,
    hardType:cur.c==="BUKVA_MATERIAL"?hardType:null,
    fixedSize:$("#fixedSize").value,
    unit:currentUnit,
    w:$("#w").value,
    h:$("#h").value,
    q:$("#q").value,
    priceMode,
    packaging:$("#canvasPackaging").checked,
    design:$("#designCheck").checked,
    editingId,
    services:(cur.s||[]).map((s,i)=>({
      checked:!!$('[data-si="'+i+'"]')?.checked,
      qty:$('[data-qi="'+i+'"]')?.value||""
    }))
  });
}
function restoreProductDraft(draft){
  editingId=null;
  $("#save").textContent="Сохранить расчёт";
  if(!draft)return;
  const variant=Number(draft.variant);
  if(cur.v&&Number.isInteger(variant)&&variant>=0&&variant<cur.v.length){
    $("#variant").value=String(variant);
    document.querySelectorAll(".variantChip").forEach(b=>b.classList.toggle("active",+b.dataset.vi===variant));
    if(cur.c==="SRA3")restoreSraVariant(variant);
  }
  if(cur.c==="BUKVA_MATERIAL"){
    hardType=draft.hardType==="shapes"?"shapes":"letters";
    updateHardType();
  }
  if(cur.sizes&&draft.fixedSize!=null&&cur.sizes[+draft.fixedSize]){
    $("#fixedSize").value=String(draft.fixedSize);
  }
  priceMode=cur.priceModes&&draft.priceMode==="wholesale"?"wholesale":"retail";
  document.querySelectorAll(".priceMode").forEach(b=>b.classList.toggle("active",b.dataset.mode===priceMode));
  currentUnit=(cur.c==="SRA3"
    ?(["mm","cm"].includes(draft.unit)?draft.unit:"mm")
    :(["m","cm","mm"].includes(draft.unit)?draft.unit:"m"));
  refreshUnitControls();
  $("#w").value=draft.w??$("#w").value;
  $("#h").value=draft.h??$("#h").value;
  const minQuantity=cur.t==="cards"?120:1;
  $("#q").value=String(Math.max(minQuantity,Number(draft.q)||minQuantity));
  $("#canvasPackaging").checked=cur.c==="HOLST"&&!!draft.packaging;
  $("#designCheck").checked=!!draft.design;
  (draft.services||[]).forEach((service,i)=>{
    const checkbox=$('[data-si="'+i+'"]');
    const value=$('[data-qi="'+i+'"]');
    if(checkbox)checkbox.checked=!!service.checked;
    if(value)value.value=service.qty??value.value;
  });
  updateCanvasPackagingLabel();
  editingId=draft.editingId??null;
  $("#save").textContent=editingId?"Сохранить изменения":"Сохранить расчёт";
}
function closeFileGuide(){
  $("#fileGuideContent").classList.add("hidden");
  $("#fileGuideButton").setAttribute("aria-expanded","false");
}
function closeDesignInfo(){
  $("#designInfoPopover").classList.add("hidden");
  $("#designInfoButton").setAttribute("aria-expanded","false");
}
const productGroupOrder={POLY:0,WIDE:1,CANVAS:2,LETTERS:3,PLOTTER:3,VOLUME:4,VOLUME_ADS:5,ADS:6,BRAND:7};
function orderedProductEntries(){
  return DATA.products.map((p,i)=>({p,i})).sort((a,b)=>
    (productGroupOrder[a.p.cat]??99)-(productGroupOrder[b.p.cat]??99)||a.i-b.i);
}
function renderProducts(){$("#products").innerHTML=orderedProductEntries().map(({p,i})=>`<button class="product" data-i="${i}"><b>${p.n}</b><em>${p.subtitle||DATA.cats[p.cat]}</em></button>`).join("");$$(".product").forEach(b=>b.onclick=()=>openProduct(+b.dataset.i))}
function openProduct(i){closeDesignInfo();if(cur&&!$("#form").classList.contains("hidden"))rememberProductDraft();cur=DATA.products[i];editingId=null;
const pending=cur.t==="pending";
$("#form").classList.toggle("pendingForm",pending);
$("#pendingInfo").classList.toggle("hidden",!pending);
if(pending){
  $("#products").classList.add("hidden");
  $("#form").classList.remove("hidden");
  $("#backProducts").classList.remove("hidden");
  $("#category").textContent=DATA.cats[cur.cat];
  $("#productName").textContent=cur.n;
  $("#comment").textContent="";
  closeFileGuide();
  $("#fileGuide").classList.add("hidden");
  return;
}$("#save").textContent="Сохранить расчёт";$("#products").classList.add("hidden");$("#form").classList.remove("hidden");$("#backProducts").classList.remove("hidden");$("#category").textContent=DATA.cats[cur.cat];$("#productName").textContent=cur.n;$("#comment").textContent=cur.d||"";$("#variantWrap").classList.toggle("hidden",cur.t==="fixed"||cur.c==="SRA3"||cur.c==="SATIN_PAPER");$("#hardTypeWrap").classList.toggle("hidden",cur.c!=="BUKVA_MATERIAL");hardType="letters";$("#sra3Options").classList.toggle("hidden",cur.c!=="SRA3");$("#sra3Summary").classList.toggle("hidden",cur.c!=="SRA3");$("#canvasOptions").classList.toggle("hidden",cur.t!=="fixed");$("#fixedSizeWrap").classList.toggle("hidden",cur.t!=="fixed");$("#canvasPackagingWrap").classList.toggle("hidden",cur.c!=="HOLST");$("#canvasPackaging").checked=false;const quantityField=$("#q").closest("label");if(cur.c==="HOLST"){$("#canvasOptions").appendChild(quantityField)}else{$("#measureControls").appendChild(quantityField)}$("#measureControls").classList.toggle("hidden",cur.c==="HOLST");$("#priceModeWrap").classList.toggle("hidden",!cur.priceModes);priceMode="retail";document.querySelectorAll(".priceMode").forEach(x=>x.classList.toggle("active",x.dataset.mode==="retail"));const noDimensions=["fixed","business","cards"].includes(cur.t);$("#dimensions").classList.toggle("hidden",noDimensions);$("#unitsField").classList.toggle("hidden",noDimensions);$("#measureControls").classList.toggle("quantityOnly",noDimensions);$("#q").parentElement.classList.toggle("hidden",cur.t==="business");if(cur.t==="cards"){$("#q").parentElement.classList.remove("hidden");$("#q").min="120";$("#q").step="30";$("#q").value="120"}else{$("#q").min="1";$("#q").step="1";$("#q").value="1"};if(cur.v){$("#variant").innerHTML=cur.v.map((v,i)=>`<option value="${i}">${v[0]}</option>`).join("");$("#variant").value="0";const vw=$("#variantWrap");vw.querySelector(".variantChips")?.remove();vw.querySelector("label").firstChild.textContent=cur.c==="VISITKI"?"Тип печати":cur.c==="BYKVA_OBIEM"?"Тип изделия":cur.c==="BUKVA_MATERIAL"?"Материал":"Материал / вариант";const useVariantChips=["BANNER","PLENKA_PRINT","VISITKI","BUKVA_MATERIAL","POLOTNO_FORMA","PLENKA_PLOTTER","BYKVA_OBIEM"].includes(cur.c);$("#variant").classList.toggle("hidden",useVariantChips);if(useVariantChips){const chips=document.createElement("div");chips.className="variantChips";chips.innerHTML=cur.v.map((v,i)=>`<button type="button" class="variantChip ${i===0?"active":""}" data-vi="${i}">${v[0]}</button>`).join("");vw.querySelector("label").appendChild(chips);chips.querySelectorAll(".variantChip").forEach(b=>b.onclick=()=>{$("#variant").value=b.dataset.vi;chips.querySelectorAll(".variantChip").forEach(x=>x.classList.toggle("active",x===b));calc()})}}if(cur.c==="BUKVA_MATERIAL")updateHardType();if(cur.c==="SRA3"){
  $("#sraMaterial").value="paper130";
  $("#sraSides").value="single";
  updateSraVariant();
  currentUnit="mm";
  $("#w").value="65";$("#h").value="90";$("#q").value="1";
  $("#w").min="1";$("#h").min="1";$("#w").step="1";$("#h").step="1";
 }else{
  currentUnit="m";$("#w").value="1";$("#h").value="1";
  $("#w").min=".01";$("#h").min=".01";$("#w").step=".01";$("#h").step=".01";
 }
 document.querySelector('.unit[data-unit="m"]').classList.toggle("hidden",cur.c==="SRA3");
 refreshUnitControls();
 if(cur.sizes){$("#fixedSize").innerHTML=cur.sizes.map((s,i)=>`<option value="${i}">${s[0]}×${s[1]} см</option>`).join("");$("#fixedSize").value="0";updateCanvasPackagingLabel()}$("#form").classList.toggle("bannerForm",cur.c==="BANNER"||cur.c==="PLENKA_PRINT");let productNote=$("#productNote");if(!productNote){productNote=document.createElement("div");productNote.id="productNote";productNote.className="productNote";$("#services").after(productNote)}productNote.textContent=cur.note||"";productNote.classList.toggle("hidden",!cur.note);$("#designCheck").checked=false;
renderServices();
restoreProductDraft(productDrafts.get(cur.c));
closeFileGuide();
$("#fileGuideText").textContent="Требования к подготовке файла для «"+cur.n+"» будут добавлены позже.";
$("#fileGuide").classList.remove("hidden");
calc()}
function updateCanvasPackagingLabel(){const selected=cur?.sizes?.[+$("#fixedSize").value||0];$("#canvasPackagingPrice").textContent=selected&&cur.c==="HOLST"?"+"+money(selected[4]||0)+" / шт.":""}
function renderServices(){
  const box=$("#services");
  if(cur.c==="BANNER"){
    box.innerHTML=`<div class="bannerExtras">
      <div class="bannerExtrasHeading">Дополнительная обработка</div>
      <div class="bannerExtrasMain">
        <div class="bannerExtraColumn bannerExtraGlue">
          <label class="bannerExtraCheck"><input type="checkbox" data-si="0"><span>Проклей</span></label>
        </div>
        <div class="bannerExtraColumn bannerExtraEyelets">
          <label class="bannerExtraCheck"><input type="checkbox" data-si="1"><span>Люверсы</span></label>
          <label class="bannerDesiredStep"><span>Желаемый шаг, см</span>
            <input class="serviceQty" data-qi="1" type="number" min="1" step="1" value="20">
          </label>
        </div>
      </div>
      <div class="bannerFactLine hidden" aria-live="polite">
        <span class="bannerFactStep hidden" data-eyelet-result="1"></span>
      </div>
    </div>`;
  }else{
    box.innerHTML=(cur.s||[]).map((s,i)=>`<div class="service"><input type="checkbox" data-si="${i}"><span>${s[0]} · ${money(s[1])}/${s[2]}</span><input class="serviceQty" data-qi="${i}" type="number" min="0" step="1" value="0" placeholder="Количество"></div>`).join("");
  }
  box.classList.toggle("hidden",!(cur.s||[]).length);
  box.querySelectorAll("input").forEach(x=>x.addEventListener("input",calc));
}
const EYELET_EDGE_OFFSET_CM=1.5;
function calculateEyelets(widthCm,heightCm,desiredStepCm){
  const spanW=widthCm-2*EYELET_EDGE_OFFSET_CM;
  const spanH=heightCm-2*EYELET_EDGE_OFFSET_CM;
  if(!(spanW>0&&spanH>0&&desiredStepCm>0))return null;
  const intervalsW=Math.max(1,Math.round(spanW/desiredStepCm));
  const intervalsH=Math.max(1,Math.round(spanH/desiredStepCm));
  return {
    widthCount:intervalsW+1,
    heightCount:intervalsH+1,
    widthStep:spanW/intervalsW,
    heightStep:spanH/intervalsH,
    count:2*intervalsW+2*intervalsH
  };
}
const fmtEyeletStep=n=>n.toLocaleString("ru-RU",{maximumFractionDigits:2});
function fmtStep(n){return Number.isInteger(n)?String(n):n.toFixed(1).replace(".",",")}function calc(){if(!cur)return;let base=0,q=Math.max(1,Math.ceil(+$("#q").value||1)),idx=+$("#variant").value||0,sraLayout=null;if(cur.t==="area"){base=dimM("w")*dimM("h")*(cur.v[idx]?.[priceMode==="wholesale"&&cur.v[idx]?.[2]!=null?2:1]||0)*q}else if(cur.t==="fixed"){const s=cur.sizes[+$("#fixedSize").value||0];base=(s?.[priceMode==="wholesale"&&s?.[3]!=null?3:2]||0)*q}else if(cur.t==="sheet"){
  sraLayout=calculateSra3Layout(sraMm("w"),sraMm("h"),q);
  if(sraLayout){
    base=(cur.v[idx]?.[1]||0)*sraLayout.sheets;
    $("#sra3PerSheet").textContent=sraLayout.perSheet+" шт.";
    $("#sra3Sheets").textContent=sraLayout.sheets+" шт.";
    $("#sra3LayoutNote").textContent=
      "Раскладка "+sraLayout.columns+" × "+sraLayout.rows+
      (sraLayout.rotated?" (все изделия повёрнуты на 90°).": " (без поворота).")+
      " Поля и промежутки — 2 мм, ориентации не смешиваются.";
  }else{
    $("#sra3PerSheet").textContent="—";
    $("#sra3Sheets").textContent="—";
    $("#sra3LayoutNote").textContent="Изделие не помещается на лист SRA3 (330 × 487 мм) с полями 2 мм. Уменьшите размеры.";
  }
}else if(cur.t==="business"){base=cur.v[idx]?.[1]||0}else if(cur.t==="cards"){q=Math.max(120,120+Math.round((q-120)/30)*30);$("#q").value=q;base=(cur.v[idx]?.[1]||0)*q}const packaging=cur.c==="HOLST"&&$("#canvasPackaging").checked?(cur.sizes[+$("#fixedSize").value||0]?.[4]||0)*q:0;let extra=0;
const bannerBreakdown={perimeter:null,eyelets:null};
const serviceDetails={};
(cur.s||[]).forEach((s,i)=>{
  const ch=$(`[data-si="${i}"]`),input=$(`[data-qi="${i}"]`),qty=+input?.value||0;
  const factStep=$(`[data-eyelet-result="${i}"]`);
  if(factStep)factStep.classList.add("hidden");
  if(!ch?.checked)return;
  if(s[2]==="autoPerimeter"){
    const perimeter=2*(dimM("w")+dimM("h"));
    const amount=s[1]*perimeter*q;
    extra+=amount;
    bannerBreakdown.perimeter={perimeter,amount};
    serviceDetails[i]=`${fmtEyeletStep(perimeter)} пог. м на изделие × ${q} шт. — ${money(amount)}`;
  }else if(s[2]==="autoEyelets"){
    const eyelets=calculateEyelets(dimM("w")*100,dimM("h")*100,qty);
    if(!eyelets){
      if(factStep){factStep.textContent="Проверьте размер и шаг";factStep.classList.remove("hidden")}
      return;
    }
    const amount=s[1]*eyelets.count*q;
    extra+=amount;
    bannerBreakdown.eyelets={...eyelets,amount};
    if(factStep){
      factStep.textContent=`Фактический: ширина ${fmtEyeletStep(eyelets.widthStep)} см · высота ${fmtEyeletStep(eyelets.heightStep)} см`;
      factStep.classList.remove("hidden");
    }
    serviceDetails[i]=`${eyelets.count} шт. на изделие × ${q} шт. — ${money(amount)}; фактический шаг ${fmtEyeletStep(eyelets.widthStep)} / ${fmtEyeletStep(eyelets.heightStep)} см`;
  }else extra+=s[1]*qty;
});
const bannerFactLine=$("#services .bannerFactLine");
if(bannerFactLine)bannerFactLine.classList.toggle("hidden",!bannerFactLine.querySelector(".bannerFactStep:not(.hidden)"));
$("#basePrice").textContent=money(base);
$("#serviceLine").classList.toggle("hidden",!extra||cur.c==="BANNER");
$("#servicePrice").textContent=money(extra);
$("#bannerPerimeterLine").classList.toggle("hidden",cur.c!=="BANNER"||!bannerBreakdown.perimeter);
$("#bannerEyeletLine").classList.toggle("hidden",cur.c!=="BANNER"||!bannerBreakdown.eyelets);
if(bannerBreakdown.perimeter){
  $("#bannerPerimeterLabel").textContent=`Проклей · ${fmtEyeletStep(bannerBreakdown.perimeter.perimeter)} пог. м × ${q} шт.`;
  $("#bannerPerimeterPrice").textContent=money(bannerBreakdown.perimeter.amount);
}
if(bannerBreakdown.eyelets){
  $("#bannerEyeletLabel").textContent=`Люверсы · ${bannerBreakdown.eyelets.count} шт. × ${q} изд.`;
  $("#bannerEyeletPrice").textContent=money(bannerBreakdown.eyelets.amount);
}
$("#packagingLine").classList.toggle("hidden",!packaging);$("#packagingOut").textContent=money(packaging);const invalidSra=cur.c==="SRA3"&&!sraLayout;
 $("#save").disabled=invalidSra;$("#order").disabled=invalidSra;
 $("#total").textContent=invalidSra?"—":money(base+extra+packaging);
 return{base,extra,packaging,total:base+extra+packaging,sraLayout,serviceDetails,valid:!invalidSra}}
document.querySelectorAll(".priceMode").forEach(b=>b.onclick=()=>{priceMode=b.dataset.mode;document.querySelectorAll(".priceMode").forEach(x=>x.classList.toggle("active",x===b));calc()});document.querySelectorAll(".unit").forEach(b=>b.onclick=()=>{const next=b.dataset.unit;if(next===currentUnit)return;const old=unitFactor();currentUnit=next;const neu=unitFactor();["w","h"].forEach(id=>{const el=$("#"+id);el.value=+(el.value*old/neu).toFixed(currentUnit==="m"?3:currentUnit==="cm"?1:0)});refreshUnitControls();calc()});["w","h","q","variant"].forEach(id=>$("#"+id).addEventListener("input",calc));["sraMaterial","sraSides"].forEach(id=>$("#"+id).addEventListener("change",()=>{updateSraVariant();calc()}));document.querySelectorAll(".sraSideChip").forEach(button=>button.addEventListener("click",()=>{if(button.disabled||cur?.c!=="SRA3")return;$("#sraSides").value=button.dataset.side;updateSraVariant();calc()}));$("#fixedSize").addEventListener("change",()=>{updateCanvasPackagingLabel();calc()});$("#canvasPackaging").addEventListener("change",calc);$("#designCheck").onchange=calc;
$("#designInfoButton").addEventListener("click",()=>{
  const open=$("#designInfoPopover").classList.toggle("hidden")===false;
  $("#designInfoButton").setAttribute("aria-expanded",String(open));
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".design"))closeDesignInfo();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDesignInfo()});$("#backProducts").onclick=()=>{
  rememberProductDraft();
  closeDesignInfo();
  closeFileGuide();
  $("#fileGuide").classList.add("hidden");
  $("#form").classList.add("hidden");
  $("#products").classList.remove("hidden");
  $("#backProducts").classList.add("hidden");
};
$("#fileGuideButton").addEventListener("click",()=>{
  const content=$("#fileGuideContent");
  const visible=content.classList.toggle("hidden")===false;
  $("#fileGuideButton").setAttribute("aria-expanded",String(visible));
});
document.addEventListener("click",e=>{
  if(!$("#fileGuide").contains(e.target))closeFileGuide();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeFileGuide()});
function getSaved(){try{const a=JSON.parse(localStorage.getItem("luxprint-calcs")||"[]");if(!Array.isArray(a))return[];let updated=false;a.forEach(x=>{if(x&&x.designPricingVersion!==2){if(x.design&&Number.isFinite(+x.designPrice)&&+x.designPrice>0)x.total=Math.max(0,(+x.total||0)-(+x.designPrice));delete x.designPrice;x.designPricingVersion=2;updated=true}
if(x?.product==="BYKVA_OBIEM_SVET"){
 x.product="BYKVA_OBIEM";
 x.name="Объёмные буквы";
 x.variant=1;
 x.variantName="С подсветкой";
 updated=true;
}else if(x?.product==="BYKVA_OBIEM"&&+x.variant===0&&x.variantName==="Стандарт"){
 x.variantName="Стандартные";
 updated=true;
}
if(x?.product==="POLOTNO_FORMA"){
  const oldNames=["Акрил","ПВХ","ХДФ","ДСП","ПЭТ","Полистирол"];
  const newNames=["Акрил","Полистирол","ПВХ","ХДФ","ПЭТ","ДСП"];
  const material=oldNames.includes(x.variantName)?x.variantName:oldNames[Number(x.variant)]||oldNames[0];
  x.variant=newNames.indexOf(material);
  x.variantName=material;
  x.product="BUKVA_MATERIAL";
  x.name="Буквы и формы из твёрдых материалов";
  x.hardType="shapes";
  updated=true;
}else if(x?.product==="BUKVA_MATERIAL"&&x.hardType!=="letters"&&x.hardType!=="shapes"){
  x.name="Буквы и формы из твёрдых материалов";
  x.hardType="letters";
  updated=true;
}});if(updated)localStorage.setItem("luxprint-calcs",JSON.stringify(a));return a}catch{return[]}}
function setSaved(x){localStorage.setItem("luxprint-calcs",JSON.stringify(x));renderSaved()}
function snapshot(){const r=calc(),idx=+$("#variant").value||0,si=+$("#fixedSize").value||0,services=(cur.s||[]).map((s,i)=>({name:s[0],checked:!!$('[data-si="'+i+'"]')?.checked,qty:+$('[data-qi="'+i+'"]')?.value||0,details:r.serviceDetails?.[i]||$('[data-eyelet-result="'+i+'"]')?.textContent||""}));return{id:Date.now(),product:cur.c,name:cur.n,date:new Date().toLocaleDateString("ru-RU"),priceMode,unit:currentUnit,variant:idx,variantName:cur.v?.[idx]?.[0]||"",hardType:cur.c==="BUKVA_MATERIAL"?hardType:null,fixedSize:si,sizeName:cur.sizes?.[si]?cur.sizes[si][0]+"×"+cur.sizes[si][1]+" см":"",w:+$("#w").value||0,h:+$("#h").value||0,q:+$("#q").value||1,design:!!$("#designCheck").checked,designPricingVersion:2,sra3Layout:cur.c==="SRA3"?r.sraLayout:null,packaging:cur.c==="HOLST"&&$("#canvasPackaging").checked,packagingUnitPrice:cur.c==="HOLST"&&$("#canvasPackaging").checked?(cur.sizes[si]?.[4]||0):0,services,total:r.total}}
let editingId=null;
$("#save").onclick=()=>{const item=snapshot(),arr=getSaved();if(editingId){item.id=editingId;const i=arr.findIndex(x=>x.id==editingId);if(i>=0)arr[i]=item;else arr.unshift(item);editingId=null}else arr.unshift(item);setSaved(arr);$("#save").textContent="Сохранено ✓";setTimeout(()=>$("#save").textContent="Сохранить расчёт",1200)};
function savedDetails(x){const parts=[];if(x.product==="BUKVA_MATERIAL")parts.push("Тип изделия: "+(x.hardType==="shapes"?"Полотна и формы":"Буквы"));if(x.variantName)parts.push("Вариант: "+x.variantName);if(x.sizeName)parts.push("Размер: "+x.sizeName);if(x.w&&x.h)parts.push("Размер: "+x.w+" × "+x.h+" "+(x.unit||"м"));if(x.q)parts.push("Количество: "+x.q);if(x.priceMode&&x.product!=="SRA3")parts.push("Цена: "+(x.priceMode==="wholesale"?"опт":"розница"));if(x.product==="SRA3"&&x.sra3Layout)parts.push("SRA3: "+x.sra3Layout.perSheet+" шт./лист · "+x.sra3Layout.sheets+" л. · "+x.sra3Layout.columns+" × "+x.sra3Layout.rows+(x.sra3Layout.rotated?" (поворот 90°)":""));if(x.packaging)parts.push("Упаковка: "+money(x.packagingUnitPrice||0)+" / шт. × "+(x.q||1));(x.services||[]).filter(s=>s.checked).forEach(s=>parts.push(s.name+(s.qty?" · "+s.qty:"")+(s.details?" · "+s.details:"")));if(x.design)parts.push("Нужен дизайн — стоимость уточнит менеджер");return parts}
function renderSaved(){const a=getSaved();$("#savedCount").textContent=a.length;$("#savedList").innerHTML=a.length?a.map(x=>'<article class="savedCard"><div class="savedMain"><div class="savedTop"><div><h3>'+x.name+'</h3><p>'+x.date+'</p></div><strong class="savedPrice">'+money(x.total)+'</strong></div><div class="savedDetails">'+savedDetails(x).map(v=>'<span>'+v+'</span>').join("")+'</div></div><div class="savedActions"><button data-edit="'+x.id+'">Редактировать</button><button data-del="'+x.id+'">Удалить</button></div></article>').join(""):'<div class="empty">Пока нет сохранённых расчётов.</div>';const grand=a.reduce((s,x)=>s+(+x.total||0),0);$("#savedSendBar").classList.toggle("hidden",!a.length);$("#savedGrandTotal").textContent=money(grand);$$("[data-del]").forEach(b=>b.onclick=()=>setSaved(a.filter(x=>x.id!=b.dataset.del)));$$("[data-edit]").forEach(b=>b.onclick=()=>editSaved(a.find(x=>x.id==b.dataset.edit)))}
function orderText(items){const lines=["Здравствуйте! Хочу оформить заявку по расчётам из онлайн-калькулятора ЛюксПринт.",""];items.forEach((x,i)=>{lines.push((i+1)+". "+x.name+" — "+money(x.total));savedDetails(x).forEach(v=>lines.push("   "+v));lines.push("")});lines.push("Итого предварительно: "+money(items.reduce((s,x)=>s+(+x.total||0),0)));return lines.join("\n")}
const MAX_URL="https://max.ru/u/f9LHodD0cOITuZbrLEgN24Esqcabh3P4DewX4a-rtk819z3TTEFjMK3a4NU";
function sendToMax(items){if(!items.length)return alert("Сначала сохраните хотя бы один расчёт.");const msg=orderText(items);navigator.clipboard?.writeText(msg).catch(()=>{});window.open(MAX_URL,"_blank","noopener");alert("Расчёты скопированы в буфер обмена. Вставьте сообщение в чат MAX и отправьте его менеджеру.")}

function editSaved(x){if(!x?.product)return;const i=DATA.products.findIndex(p=>p.c===x.product);if(i<0)return;tab(false);openProduct(i);editingId=x.id;priceMode=x.priceMode||"retail";document.querySelectorAll(".priceMode").forEach(b=>b.classList.toggle("active",b.dataset.mode===priceMode));if(x.variant!=null){$("#variant").value=x.variant;document.querySelectorAll(".variantChip").forEach(b=>b.classList.toggle("active",+b.dataset.vi===+x.variant));if(cur.c==="SRA3")restoreSraVariant(+x.variant)}if(cur.c==="BUKVA_MATERIAL"){hardType=x.hardType==="shapes"?"shapes":"letters";updateHardType()}if(x.fixedSize!=null)$("#fixedSize").value=x.fixedSize;$("#canvasPackaging").checked=!!x.packaging;updateCanvasPackagingLabel();if(x.unit){
  currentUnit=cur.c==="SRA3"&&x.unit==="m"?"mm":x.unit;
  refreshUnitControls();
 }
 $("#w").value=cur.c==="SRA3"&&x.unit==="m"?65:(x.w||1);
 $("#h").value=cur.c==="SRA3"&&x.unit==="m"?90:(x.h||1);$("#q").value=x.q||1;$("#designCheck").checked=!!x.design;(x.services||[]).forEach((s,j)=>{const ch=$('[data-si="'+j+'"]'),q=$('[data-qi="'+j+'"]');if(ch)ch.checked=!!s.checked;if(q&&s.qty!=null)q.value=s.qty});$("#save").textContent="Сохранить изменения";calc()}
function tab(saved){$("#calculatorView").classList.toggle("hidden",saved);$("#savedView").classList.toggle("hidden",!saved);$("#calcTab").classList.toggle("active",!saved);$("#savedTab").classList.toggle("active",saved);if(saved)renderSaved()}$("#calcTab").onclick=()=>tab(false);$("#savedTab").onclick=()=>tab(true);$("#sendSaved").onclick=()=>sendToMax(getSaved());$("#order").onclick=()=>{const item=snapshot();sendToMax([item])};renderProducts();renderSaved();