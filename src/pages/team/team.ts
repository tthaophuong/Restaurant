import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  slides = [
    {
      title: "Restaurant Ng.​  - HEAD CHEF",
      description: "John Doe graduated from Brooklyn Law School in 1979 and consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc vehicula lacinia. Proin adipiscing porta tellus, ut feugiat nibh adipiscing sit amet.",
      image: "assets/imgs/team-26.jpg",
    },
    {
      title: "Restaurant Ng.​  - HEAD CHEF",
      description: "John Doe graduated from Brooklyn Law School in 1979 and consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc vehicula lacinia. Proin adipiscing porta tellus, ut feugiat nibh adipiscing sit amet.",
      image: "assets/imgs/depositphotos_85234144-stock-photo-chef-cook-standing-with-arms.jpg",
    },
    {
      title: "Restaurant Ng.​  - HEAD CHEF",
      description: "Chef Dimitar Damyanov is a chef with a remarkable background, who had gained experience and inspiration in some of the best restaurants in the world.",
      image: "assets/imgs/chef-making-ok-sign-over-white-background_1368-2804.jpg",
    },
    {
      title: "Restaurant Ng.​  - HEAD CHEF",
      description: "John Doe graduated from Brooklyn Law School in 1979 and consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc vehicula lacinia. Proin adipiscing porta tellus, ut feugiat nibh adipiscing sit amet.",
      image: "assets/imgs/sous-chef-definition.jpg",
    }
  ];

}
