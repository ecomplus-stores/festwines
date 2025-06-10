import getSections from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections'
import getSettings from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings'
import getLayout from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout'
import getPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages'
import getBlogPosts from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts'
import getExtraPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages'
import getWidgets from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets'

export default options => {
  options.sections = getSections(options).find(el => el.name == 'collection-shelf').fields.push(
    {
      label: 'Tipo de estante',
      required: false,
      name: 'type',
      hint: 'Selecione o tipo de estante que deseja exibir. Mosaico não suporta carrossel de produtos e Horizontal mantem duas linhas de produtos com cards no formato paisagem',
      widget: 'select',
      default: "Comum",
      options: ["Comum","Mosaico","Horizontal"],          
    }
  )

  return {
    backend: {
      name: 'git-gateway',
      branch: 'master',
      commit_messages: {
        create: 'Create {{collection}} “{{slug}}”',
        update: 'Update {{collection}} “{{slug}}”',
        delete: 'Delete {{collection}} “{{slug}}”',
        uploadMedia: 'Upload “{{path}}”',
        deleteMedia: '[skip ci] Delete “{{path}}”',
        openAuthoring: '{{message}}'
      }
    },
    logo_url: 'https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png',
    locale: 'pt',
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: '/img/uploads',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-'
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      //getReceitas(options),
      //getGrids(options),
      //getMenuConfig(options),
      getExtraPages(options),
      getWidgets(options),
      // {
      //   name: 'apx_categories',        
      //   label: '[alpix.dev] - Categorias',
      //   description: 'Adicione blocos de conteúdo em categorias especificas',
      //   folder: `${options.baseDir}content/apx_categories`,
      //   extension: 'json',
      //   create: true,
      //   slug: '{{slug}}',
      //   fields: [
      //     {
      //       label: "Título",
      //       hint:"Apenas para identificação no painel",
      //       name: "title",
      //       widget: "string"          
      //     },
      //     {
      //       label: 'Identificador',
      //       name: 'category_id',
      //       widget: 'select',
      //           multiple: false,
      //           options: [
      //             ...options.state.routes
      //             .filter(el => el.resource === 'categories')
      //             .map((el) => ({
      //               label: 'Categoria - ' + el.name,
      //               value: el._id
      //             }))
      //           ]                
      //     },
      //     {
      //       label: 'Seções',
      //       name: 'sections',
      //       widget: 'list',
      //       types: options.sections
      //     }
      //   ]
      // },
      {
        name: 'apx_tags',        
        label: '[alpix.dev] - Produtos - Tags ',
        description: 'Adicione tags nos produtos',
        folder: `${options.baseDir}content/apx_tags`,
        extension: 'json',
        create: true,
        slug: '{{slug}}',
        fields: [
          {
            label: 'Identificador [SKU]',
            name: 'identificador',
            widget: 'select',
                multiple: true,
                options: [
                  ...options.state.routes
                  .filter(({ sku }) => typeof sku === 'string')
                  .map(({ sku }) => ({
                    label: 'Produto - ' + sku,
                    value: sku
                  }))
                ]                
          },  
          {
            label: 'Texto da tag',
            required: false,
            name: 'title',
            widget: 'text'
          },        
          {
            label: 'Cor do texto',
            required: false,
            name: 'color',
            widget: 'color'
          },
          {
            label: 'Cor do fundo',
            required: false,
            name: 'background_color',
            widget: 'color'
          }
        ]
      },
      
      {
        label: "[alpix.dev]",
        name: "alpix",
        editor: {
            preview: false
        },
        files: [
          // {
          //     name: "apx_header",
          //     label: "Cabeçalho",
          //     file: "content/apx_header.json",
          //     fields: [
          //         {
          //             label: "Tarja Topo (Acima)",
          //             name: "topbar_1",
          //             widget: "object",
          //             required: false,
          //             fields: [
          //                 {
          //                     label: "Cor do Texto",
          //                     name: "color",
          //                     widget: "color"
          //                 },
          //                 {
          //                     label: "Cor do Fundo",
          //                     name: "background",
          //                     widget: "color"
          //                 },
          //                 {
          //                     label: "Itens",
          //                     name: "topbar_1",
          //                     widget: "list",
          //                     required: false,
          //                     fields: [
          //                         {
          //                             label: "Texto ou HTML",
          //                             name: "title",
          //                             widget: "string"
          //                         },
          //                         {
          //                             label: "URL",
          //                             name: "url",
          //                             widget: "string"
          //                         }
          //                     ]
          //                 }
          //             ]
          //         },                  
          //     ]
          // },
          {
              name: "popup",
              label: "Popup",
              file: "content/apx_popup.json",
              editor: {
                  preview: false
              },
              fields: [
                  {
                      label: "Imagem",
                      name: "image",
                      widget: "image",
                      required: false
                  },
                  {
                      label: "Título",
                      name: "title",
                      widget: "string"
                  },
                  {
                      label: "Texto",
                      name: "description",
                      widget: "string"
                  },
                  {
                      label: "HTML",
                      hint:"Pode ser de um formulário ou algum script qualquer",
                      name: "code",
                      widget: "code"
                  }           
              ]
          },
        ]
      }      
    ]
  }
}
