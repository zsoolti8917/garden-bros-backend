import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsAddress extends Schema.Component {
  collectionName: 'components_elements_addresses';
  info: {
    displayName: 'Address';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    header: Attribute.String & Attribute.Required;
    adresa: Attribute.Text & Attribute.Required;
    contacts: Attribute.Component<'links.contact-link', true>;
    socials: Attribute.Component<'links.social-link', true>;
  };
}

export interface ElementsFeatureLink extends Schema.Component {
  collectionName: 'components_elements_feature_links';
  info: {
    displayName: 'Feature Link';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media<'images'> & Attribute.Required;
    url: Attribute.String;
    isLink: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ElementsFeature extends Schema.Component {
  collectionName: 'components_elements_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface ElementsFooterSluzby extends Schema.Component {
  collectionName: 'components_elements_footer_sluzbies';
  info: {
    displayName: 'Footer Sluzby';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    header: Attribute.String & Attribute.Required;
    links: Attribute.Component<'links.link', true>;
  };
}

export interface ElementsRo extends Schema.Component {
  collectionName: 'components_elements_ros';
  info: {
    displayName: 'RO';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    header: Attribute.String & Attribute.Required;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    address: Attribute.Component<'elements.address'>;
    sluzby: Attribute.Component<'elements.footer-sluzby', true>;
  };
}

export interface LayoutInfobar extends Schema.Component {
  collectionName: 'components_layout_infobars';
  info: {
    displayName: 'Infobar';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    contacts: Attribute.Component<'links.contact-link', true>;
    socialsText: Attribute.String;
    socialLinks: Attribute.Component<'links.social-link', true>;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    logoImg: Attribute.Media<'images'> & Attribute.Required;
    logoText: Attribute.String & Attribute.Required;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    links: Attribute.Component<'links.link', true>;
    button: Attribute.Component<'links.button-link'>;
    navbarLogo: Attribute.Component<'layout.logo'>;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: 'components_links_button_links';
  info: {
    displayName: 'Button link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: 'components_links_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksContactLink extends Schema.Component {
  collectionName: 'components_links_contact_links';
  info: {
    displayName: 'Contact Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['email', 'tel']> & Attribute.Required;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    text: Attribute.String & Attribute.Required;
    social: Attribute.Enumeration<
      ['FACEBOOK', 'INSTAGRAM', 'YOUTUBE', 'VIBER']
    >;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    displayName: 'Metadata';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsCorp extends Schema.Component {
  collectionName: 'components_sections_corps';
  info: {
    displayName: 'Corp';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    smallText: Attribute.String;
    header: Attribute.String & Attribute.Required;
    body: Attribute.String & Attribute.Required;
    button: Attribute.Component<'links.button-link'>;
    features: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsFeatures extends Schema.Component {
  collectionName: 'components_sections_features';
  info: {
    displayName: 'Features';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    features: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    picture: Attribute.Media<'images'> & Attribute.Required;
    button: Attribute.Component<'links.button-link'>;
  };
}

export interface SectionsInfo extends Schema.Component {
  collectionName: 'components_sections_infos';
  info: {
    displayName: 'Info';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    rok: Attribute.String;
    smallText: Attribute.String;
    header: Attribute.String & Attribute.Required;
    button: Attribute.Component<'links.button-link'>;
    features: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsProjekty extends Schema.Component {
  collectionName: 'components_sections_projekties';
  info: {
    displayName: 'Projekty';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    smallText: Attribute.String;
    header: Attribute.String & Attribute.Required;
    articles: Attribute.Relation<
      'sections.projekty',
      'oneToMany',
      'api::article.article'
    >;
  };
}

export interface SectionsSluzby extends Schema.Component {
  collectionName: 'components_sections_sluzbies';
  info: {
    displayName: 'Sluzby';
    description: '';
  };
  attributes: {
    titles: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    smallText: Attribute.String;
    header: Attribute.String & Attribute.Required;
    features: Attribute.Component<'elements.feature-link', true>;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
  };
  attributes: {
    file: Attribute.Media<'images'>;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    files: Attribute.Media<'images', true> & Attribute.Required;
  };
}

export interface SharedVideoEmbed extends Schema.Component {
  collectionName: 'components_shared_video_embeds';
  info: {
    displayName: 'Video Embed';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.address': ElementsAddress;
      'elements.feature-link': ElementsFeatureLink;
      'elements.feature': ElementsFeature;
      'elements.footer-sluzby': ElementsFooterSluzby;
      'elements.ro': ElementsRo;
      'layout.footer': LayoutFooter;
      'layout.infobar': LayoutInfobar;
      'layout.logo': LayoutLogo;
      'layout.navbar': LayoutNavbar;
      'links.button-link': LinksButtonLink;
      'links.button': LinksButton;
      'links.contact-link': LinksContactLink;
      'links.link': LinksLink;
      'links.social-link': LinksSocialLink;
      'meta.metadata': MetaMetadata;
      'sections.corp': SectionsCorp;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'sections.info': SectionsInfo;
      'sections.projekty': SectionsProjekty;
      'sections.sluzby': SectionsSluzby;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.video-embed': SharedVideoEmbed;
    }
  }
}
