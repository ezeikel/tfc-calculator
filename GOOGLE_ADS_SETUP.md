# Google Ads Integration Setup

This document explains how to configure and set up Google AdSense ads in the TFC Calculator web application.

## 🎯 Overview

We've implemented a comprehensive Google Ads integration that includes:
- **GDPR-compliant cookie consent** with Google Consent Mode v2
- **Strategic ad placements** across the web application
- **Responsive ad units** that adapt to different screen sizes
- **Integration with mobile app pattern** - similar subtle placement approach

## 📍 Ad Placement Locations

### Homepage (`/`)
- **Top banner**: Between description and calculator (responsive)
- **Bottom banner**: Before footer section (728x90 banner)

### Blog Pages (`/blog/*`)
- **Top section**: After description card (responsive)
- **Content integration**: Every 6 blog posts in grid (responsive, spans full width)

### Information Pages
- **FAQs page**: After category filters + every 4 FAQ items (responsive + 728x90)
- **How It Works page**: After overview + before call-to-action (responsive + 728x90)
- **Other info pages**: Top and bottom placements

### Calculator Component
- **After results**: When calculation results are shown (300x250 medium rectangle)

## 🚀 Setup Instructions

### 1. Get Google AdSense Account
1. Apply for Google AdSense at [www.google.com/adsense](https://www.google.com/adsense)
2. Get approved (may take a few days to weeks)
3. Create ad units for each placement location
4. Note down your Publisher ID and ad unit IDs

### 2. Set up CookieScript Account

1. **Sign up at [CookieScript.com](https://cookiescript.com)**
2. **Create a new website** in your dashboard
3. **Configure settings**:
   - Enable Google Consent Mode v2
   - Set up cookie categories (necessary, analytics, advertising)
   - Customize appearance to match your brand
4. **Get your CookieScript ID** from the installation section

### 3. Configure Environment Variables

Copy the example environment file:
```bash
cp apps/web/.env.example apps/web/.env.local
```

Update the environment variables in `apps/web/.env.local`:
```env
# CookieScript Configuration (Google Certified CMP)
NEXT_PUBLIC_COOKIESCRIPT_ID=your-cookiescript-id-here

# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-publisher-id
NEXT_PUBLIC_ADSENSE_HOMEPAGE_TOP=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_HOMEPAGE_BOTTOM=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_BLOG_TOP=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_BLOG_CONTENT=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_CALCULATOR=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_FAQ=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_INFO=ca-pub-your-publisher-id/your-ad-unit-id
NEXT_PUBLIC_ADSENSE_DEFAULT=ca-pub-your-publisher-id/your-ad-unit-id
```

### 4. Create Ad Units in AdSense

Create the following ad units in your Google AdSense dashboard:

| Placement | Recommended Size | Notes |
|-----------|------------------|-------|
| Homepage Top | Responsive | Adapts to screen size |
| Homepage Bottom | 728x90 (Leaderboard) | Desktop banner |
| Blog Top | Responsive | Full width responsive |
| Blog Content | Responsive | Integrates between posts |
| Calculator Results | 300x250 (Medium Rectangle) | Square format |
| FAQ Sections | 728x90 (Leaderboard) | Between FAQ groups |
| Info Pages | Responsive | Flexible sizing |

### 5. Test the Implementation

1. **Start development server**:
   ```bash
   pnpm dev
   ```

2. **Configure CookieScript**: Visit the site and you'll see the CookieScript banner. Accept advertising cookies.

3. **Check ad placements**: Navigate through different pages to see ad placements

4. **Verify console**: Check browser console for any AdSense errors

## 🍪 Cookie Consent & GDPR Compliance

### CookieScript Integration (Google Certified CMP)
- **Google Certified**: Fully compliant with Google AdSense requirements
- **IAB TCF v2**: Implements Transparency and Consent Framework
- **Automatic Compliance**: Handles all GDPR/CCPA requirements
- **Professional**: Trusted by thousands of websites

### Features
- Appears on first visit with professional UI
- Multi-language support (automatic detection)
- Granular cookie controls with detailed explanations
- Integration with Google Consent Mode v2
- Real-time consent status updates

### User Experience
- **Accept All**: Enables all ads and tracking
- **Reject All**: Disables ads (respects user choice)
- **Customize**: Detailed cookie categories and purposes
- **Preferences**: Users can change settings anytime

## 🎨 Design Integration

### Visual Design
- Ads are wrapped in subtle borders (`border-muted/50`)
- Consistent with existing card-based design system
- Responsive sizing that works on mobile and desktop
- Loading states show "Advertisement" placeholder

### Mobile Optimization
- Uses responsive ad units that adapt to mobile screens
- Strategic placement that doesn't disrupt user experience
- Similar approach to mobile app's banner implementation

## 📊 Ad Performance Optimization

### Placement Strategy
- **Above the fold**: Homepage top, blog top for maximum visibility
- **Content integration**: Between blog posts and FAQ items for natural flow
- **Result-driven**: Calculator ads appear after engagement (calculation)
- **Exit intent**: Bottom placements before users leave

### Size Optimization
- **Responsive units**: Adapt to available space
- **High-performing sizes**: 728x90, 300x250, responsive
- **Mobile-friendly**: Responsive units work well on all devices

## 🔧 Technical Implementation

### Components
- `AdBanner.tsx`: Main ad component with consent checking
- `CookieConsent.tsx`: GDPR-compliant consent management
- Integrated into existing page components

### Key Features
- **Consent-aware**: Only shows ads with user permission
- **Error handling**: Graceful fallbacks if ads fail to load
- **Performance**: Lazy loading and non-blocking
- **SEO-friendly**: Proper HTML structure

### Browser Support
- Works with all modern browsers
- Respects user privacy settings
- Compatible with ad blockers (graceful degradation)

## 🚦 Going Live

### Pre-launch Checklist
- [ ] AdSense account approved
- [ ] All environment variables configured
- [ ] Cookie consent banner tested
- [ ] Ad placements reviewed on mobile/desktop
- [ ] Performance impact assessed
- [ ] Legal compliance verified

### Launch Steps
1. Deploy to production with environment variables
2. Submit site for AdSense review (if required)
3. Monitor ad performance in AdSense dashboard
4. Optimize placements based on performance data

### Post-launch Monitoring
- Check AdSense dashboard for revenue and performance
- Monitor Core Web Vitals for performance impact
- A/B test different ad placements
- Gather user feedback on ad experience

## 💡 Tips for Success

### Content Quality
- Maintain high-quality, original content
- Ensure fast page load times
- Keep good content-to-ad ratio

### User Experience
- Don't overload pages with ads
- Ensure ads don't interfere with functionality
- Respect user privacy choices

### Performance
- Monitor page speed impact
- Use responsive ad units for better performance
- Consider lazy loading for below-the-fold ads

## 🛠️ Troubleshooting

### Common Issues
- **Ads not showing**: Check environment variables and consent status
- **Console errors**: Verify AdSense account and ad unit IDs
- **Mobile display**: Test responsive units on various screen sizes
- **Revenue low**: Review ad placements and content quality

### Debug Steps
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test with different browsers/devices
4. Check AdSense account for policy violations
5. Monitor Core Web Vitals for performance issues

---

## 📞 Support

For technical issues with the implementation, check:
- [Google AdSense Help Center](https://support.google.com/adsense)
- [Google Consent Mode Documentation](https://developers.google.com/tag-platform/security/guides/consent)
- This project's GitHub issues

Remember: Ad revenue optimization is an iterative process. Start with the basic setup and optimize based on performance data and user feedback.