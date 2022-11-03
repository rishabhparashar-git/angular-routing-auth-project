import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  tasks: any;
  // tasks: any = [
  //   {
  //     id: '1',
  //     description:
  //       "Get professionally certified in Product Management from SP Jain Global & become a part of their global Alumni network. Product Management course involves 4 months of live rigorous training from SP Jain's top faculty across Australia, Dubai, & India, along with live sessions from top product leaders.",
  //   },
  //   {
  //     id: '2',
  //     description:
  //       'This AI program with Wharton Online gives you the competitive edge in emerging business technologies. The AI program delivers a foundational understanding of today’s top technologies, including big data, AI, and machine learning, and how you can use them to support your organization’s strategy.',
  //   },
  //   {
  //     id: '3',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '4',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '5',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '6',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '7',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '8',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '9',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  //   {
  //     id: '10',
  //     description:
  //       "Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
  //   },
  // ];
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((responseData) => {
      this.tasks = responseData;
    });
  }
}
